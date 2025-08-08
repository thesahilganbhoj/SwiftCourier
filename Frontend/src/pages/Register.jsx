import { useState } from "react"
import Navbar from "../components/Navbar"
import { registerCustomer } from "../services/auth"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const payload = {
        name,
        email,
        password, // backend will hash using SHA-256
        contactNumber: phone,
        address,
      }
      await registerCustomer(payload)
      alert("Registration successful! Please login.")
      window.location.href = "/login"
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginClick = () => {
    window.location.href = "/login"
  }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    form: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "450px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
      fontSize: "24px",
    },
    inputGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "5px", color: "#555", fontSize: "14px" },
    input: {
      width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px", boxSizing: "border-box",
    },
    textarea: {
      width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px",
      boxSizing: "border-box", minHeight: "80px", resize: "vertical",
    },
    button: {
      width: "100%", padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px",
      fontSize: "16px", cursor: "pointer", marginTop: "10px",
    },
    loginButton: {
      width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px",
      fontSize: "16px", cursor: "pointer", marginTop: "10px",
    },
    divider: { textAlign: "center", margin: "20px 0", color: "#666", fontSize: "14px" },
  }

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>SwiftCourier Register (Customer)</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="name">Full Name</label>
              <input style={styles.input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input style={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="phone">Phone Number</label>
              <input style={styles.input} type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="address">Address</label>
              <textarea style={styles.textarea} id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input style={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button
              style={styles.button}
              type="submit"
              disabled={loading}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div style={styles.divider}>Already have an account?</div>

          <button
            style={styles.loginButton}
            type="button"
            onClick={handleLoginClick}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register