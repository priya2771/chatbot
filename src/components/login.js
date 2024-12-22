import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Axios handles JSON automatically
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Save JWT token
        localStorage.setItem("token", response.data.token);
        navigate("/chatbot"); // Correct relative path for navigation
      } else {
        setError(response.data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "300px",
    margin: "50px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  error: { color: "red" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;
