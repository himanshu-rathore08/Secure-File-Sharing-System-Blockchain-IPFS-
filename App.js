import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFileUpload,
  FaDownload,
  FaCopy,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [progress, setProgress] = useState(0);

  const API = "http://127.0.0.1:5000";

  // -------- LOGIN --------
  const login = async () => {
    const res = await axios.post(`${API}/login`, form);
    localStorage.setItem("token", res.data.token);
    setUser(form.username);
  };

  // -------- LOGOUT --------
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // -------- FETCH FILES --------
  const fetchFiles = async () => {
    const res = await axios.get(`${API}/myfiles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFiles(res.data);
  };

  // -------- UPLOAD --------
  const upload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (p) => {
        setProgress(Math.round((p.loaded * 100) / p.total));
      },
    });

    setProgress(0);
    fetchFiles();
  };

  // -------- AUTO LOGIN --------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser("User");
      fetchFiles();
    }
  }, []);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // -------- LOGIN UI --------
  if (!user) {
    return (
      <div style={styles.bg}>
        <div style={styles.glass}>
          <h2>🔐 Secure File Sharing</h2>
          <h3 style={styles.name}>
          Himanshu Rathore 🚀
          </h3>

          <input
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={styles.input}
          />

          <button onClick={login} style={styles.btnPrimary}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // -------- FILTER FILES --------
  const filtered = files.filter((f) =>
    f.filename.toLowerCase().includes(search.toLowerCase())
  );

  // -------- DASHBOARD --------
  return (
    <div style={theme === "dark" ? styles.bg : styles.lightBg}>
      <div style={styles.dashboard}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2>📁 Secure File Dashboard</h2>
          <div>
            <span>👤 {user}</span>
            <button onClick={logout} style={styles.logout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        {/* THEME SWITCH */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Toggle Theme 🌗
        </button>

        {/* SEARCH */}
        <div style={styles.searchBox}>
          <FaSearch />
          <input
            placeholder="Search files..."
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>

        {/* UPLOAD */}
        <div style={styles.uploadBox}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={upload} style={styles.btnPrimary}>
            <FaFileUpload /> Upload
          </button>
        </div>

        {/* PROGRESS */}
        {progress > 0 && (
          <div style={styles.progress}>
            Uploading: {progress}%
          </div>
        )}

        {/* FILE LIST */}
        <div style={styles.fileList}>
          {filtered.map((f, i) => (
            <div key={i} style={styles.card}>
              <h4>{f.filename}</h4>

              <p>📅 {new Date().toLocaleDateString()}</p>
              <p>📦 {Math.floor(Math.random() * 1000)} KB</p>

              {/* PREVIEW */}
              {f.filename.endsWith(".pdf") && (
                <iframe
                  src={`http://127.0.0.1:8080/ipfs/${f.hash}`}
                  width="100%"
                  height="150"
                  title="preview"
                />
              )}

              <p>Hash:</p>
              <div style={styles.row}>
                <span>{f.hash.slice(0, 15)}...</span>
                <FaCopy onClick={() => copy(f.hash)} />
              </div>

              <p>Key:</p>
              <div style={styles.row}>
                <span>{f.key.slice(0, 15)}...</span>
                <FaCopy onClick={() => copy(f.key)} />
              </div>

              <button
                onClick={() =>
                  window.open(
                    `${API}/download/${f.hash}?key=${f.key}`
                  )
                }
                style={styles.btnDownload}
              >
                <FaDownload /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------- STYLES --------
const styles = {
  bg: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
  },
  lightBg: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "black",
    padding: "20px",
  },
  glass: {
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
  },
  dashboard: {
    maxWidth: "900px",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  btnPrimary: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  logout: {
    marginLeft: "10px",
    background: "red",
    color: "white",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },
  name: {
  background: "linear-gradient(90deg, #22c55e, #3b82f6, #a855f7)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  fontSize: "20px",
  marginTop: "10px",
  textShadow: "0 0 10px rgba(59,130,246,0.5)",
  },
  
  search: {
    width: "100%",
    padding: "8px",
  },
  uploadBox: {
    marginBottom: "20px",
  },
  progress: {
    background: "orange",
    padding: "5px",
    marginBottom: "10px",
  },
  fileList: {
    display: "grid",
    gap: "15px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    background: "#1e293b",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnDownload: {
    marginTop: "10px",
    padding: "8px",
    background: "#6366f1",
    border: "none",
    color: "white",
  },
};

export default App;