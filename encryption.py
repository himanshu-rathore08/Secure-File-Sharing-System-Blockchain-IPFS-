from cryptography.fernet import Fernet

def encrypt_file(data):

    key = Fernet.generate_key()
    cipher = Fernet(key)

    encrypted_data = cipher.encrypt(data)

    return encrypted_data, key


def decrypt_file(encrypted_data, key):

    cipher = Fernet(key)
    decrypted_data = cipher.decrypt(encrypted_data)

    return decrypted_data