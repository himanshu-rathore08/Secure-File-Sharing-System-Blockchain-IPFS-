# 🔐 Secure File Sharing with Blockchain

A full-stack, industry-level application that enables **secure file sharing using encryption, IPFS (decentralized storage), and blockchain technology**. This project ensures that files are tamper-proof, securely stored, and accessible only with a valid decryption key.

---

## 🚀 Features

* 🔐 **User Authentication (JWT-based)**
* 📤 **Secure File Upload with Encryption**
* 📦 **Decentralized Storage using IPFS**
* ⛓️ **Blockchain Integration (Ethereum + Smart Contract)**
* 📁 **Personal File Dashboard**
* 🔍 **Search & Filter Files**
* 📄 **File Preview (PDF/Image)**
* 📊 **Upload Progress Indicator**
* 📋 **Copy Hash & Key**
* 🎨 **Premium UI with Theme Switch**
* 👤 **User Profile + Logout**

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* Axios
* React Icons
* CSS (Glassmorphism UI)

### 🔹 Backend

* Flask (Python)
* Flask-CORS
* Flask-JWT-Extended
* Cryptography (Encryption)

### 🔹 Blockchain

* Hardhat
* Solidity Smart Contracts
* Ethereum Local Network

### 🔹 Storage

* IPFS (Kubo / Infura)

### 🔹 Database (Optional Upgrade)

* MongoDB

---

## 📂 Project Structure

```
secure-file-sharing-blockchain/
│
├── backend/
│   ├── app.py
│   ├── encryption.py
│   ├── ipfs.py
│   ├── blockchain.py
│
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── hardhat.config.js
│
├── frontend/
│   ├── src/
│   ├── App.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 1. Clone Repository

```bash
git clone https://github.com/your-username/secure-file-sharing-blockchain.git
cd secure-file-sharing-blockchain
```

---

### 🔧 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### 🔧 3. Blockchain Setup

```bash
cd blockchain
npm install
npx hardhat node
```

Deploy contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

### 🔧 4. IPFS Setup

Download IPFS (Kubo) and run:

```bash
ipfs daemon
```

---

### 🔧 5. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔑 API Endpoints

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | `/register`                  | Register user         |
| POST   | `/login`                     | Login & get JWT       |
| POST   | `/upload`                    | Upload encrypted file |
| GET    | `/download/<hash>?key=<key>` | Download file         |
| GET    | `/myfiles`                   | Get user files        |

---

## 🔐 How It Works

1. User logs in (JWT authentication)
2. File is encrypted using symmetric encryption
3. Encrypted file is uploaded to IPFS
4. IPFS hash is stored on blockchain
5. User receives:

   * IPFS Hash
   * Encryption Key
6. File can be downloaded and decrypted using the key

---

## 🌍 Deployment

* Frontend → Vercel
* Backend → Render
* IPFS → Infura / Public Gateway

---

## 📸 Screenshots

* Login Page
* Dashboard
* File Upload
* File Preview

*(Add your screenshots here)*

---

## 👨‍💻 Author

**Himanshu Rathore** 🚀

* MCA Student
* Full Stack Developer
* AI/ML Enthusiast

---

## ⭐ Future Enhancements

* MongoDB Integration (persistent storage)
* MetaMask Wallet Authentication
* File Sharing via Link
* Role-based Access Control
* Cloud IPFS (Pinata/Infura)

---

## 📜 License

This project is for educational and portfolio purposes.

---

## 💡 Final Note

This project demonstrates a real-world implementation of:

> 🔐 Secure Systems + ⛓️ Blockchain + 📦 Decentralized Storage

A strong addition to any developer portfolio 🚀
