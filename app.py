from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

from encryption import encrypt_file, decrypt_file
from ipfs import upload_to_ipfs, download_from_ipfs
from blockchain import store_file_hash

app = Flask(__name__)
CORS(app)

# JWT config
app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Fake DB (temporary)
users = {}
files_db = []
users["test"] = bcrypt.generate_password_hash("1234").decode()

@app.route("/")
def home():
    return jsonify({"message": "API Running"})

# ---------------- AUTH ---------------- #

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    if username in users:
        return jsonify({"error": "User exists"}), 400

    hashed = bcrypt.generate_password_hash(password).decode()
    users[username] = hashed

    return jsonify({"message": "User registered"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    if username not in users:
        return jsonify({"error": "Invalid user"}), 401

    if not bcrypt.check_password_hash(users[username], password):
        return jsonify({"error": "Wrong password"}), 401

    token = create_access_token(identity=username)

    return jsonify({"token": token})

# ---------------- FILE UPLOAD ---------------- #

@app.route("/upload", methods=["POST"])
@jwt_required()
def upload_file():
    current_user = get_jwt_identity()

    file = request.files["file"]
    file_data = file.read()

    encrypted_data, key = encrypt_file(file_data)
    ipfs_hash = upload_to_ipfs(encrypted_data)
    receipt = store_file_hash(ipfs_hash)

    files_db.append({
        "user": current_user,
        "filename": file.filename,
        "hash": ipfs_hash,
        "key": key.decode()
    })

    return jsonify({
        "ipfs_hash": ipfs_hash,
        "key": key.decode()
    })

# ---------------- GET FILES ---------------- #

@app.route("/myfiles", methods=["GET"])
@jwt_required()
def get_files():
    current_user = get_jwt_identity()

    user_files = [f for f in files_db if f["user"] == current_user]

    return jsonify(user_files)

# ---------------- DOWNLOAD ---------------- #

@app.route("/download/<ipfs_hash>", methods=["GET"])
def download(ipfs_hash):
    key = request.args.get("key")

    if not key:
        return jsonify({"error": "Key is required"}), 400

    try:
        encrypted_data = download_from_ipfs(ipfs_hash)
        decrypted_data = decrypt_file(encrypted_data, key.encode())

        return decrypted_data

    except:
        return jsonify({"error": "Download failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)