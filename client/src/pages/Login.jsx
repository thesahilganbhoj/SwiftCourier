import { useState } from "react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login:", { email, password, role })
  }

  const handleRegisterClick = () => {
    window.location.href = "/register"
  }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
      fontSize: "24px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#555",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box",
      backgroundColor: "white",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    registerButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    link: {
      textAlign: "center",
      marginTop: "20px",
    },
    linkText: {
      color: "#007bff",
      textDecoration: "none",
      fontSize: "14px",
    },
    divider: {
      textAlign: "center",
      margin: "20px 0",
      color: "#666",
      fontSize: "14px",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>SwiftCourier Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="role">
              Login As
            </label>
            <select style={styles.select} id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            style={styles.button}
            type="submit"
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </form>

        <div style={styles.link}>
          <a href="#" style={styles.linkText}>
            Forgot Password?
          </a>
        </div>

        <div style={styles.divider}>Don't have an account?</div>

        <button
          style={styles.registerButton}
          type="button"
          onClick={handleRegisterClick}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Login