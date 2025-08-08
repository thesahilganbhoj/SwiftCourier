import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../App"
import Navbar from "../components/Navbar"
import { login } from "../services/auth"

function Login() {
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // if already logged in, redirect based on role
    const stored = localStorage.getItem("user")
    if (stored) {
      const u = JSON.parse(stored)
      redirectByRole(u.role, u.userId)
    }
  }, [])

  const redirectByRole = (roleArg, userId) => {
    switch ((roleArg || "").toUpperCase()) {
      case "ADMIN":
        window.location.href = "/admin/dashboard"
        break
      case "CUSTOMER":
        window.location.href = "/customer/homepage"
        break
      case "STAFF":
        // Prefer route with staffId param if available
        window.location.href = userId ? `/staff/staff-details/${userId}` : "/staff/staff-details"
        break
      default:
        window.location.href = "/"
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!role) {
      alert("Please select a role")
      return
    }
    try {
      setLoading(true)
      const resp = await login({ email, password, role })
      if (resp?.success) {
        const userData = {
          role: resp.role,
          userId: resp.userId,
          name: resp.name,
          email,
        }
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        redirectByRole(resp.role, resp.userId)
      } else {
        alert(resp?.message || "Incorrect credentials")
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Incorrect credentials")
      console.error(err)
    } finally {
      setLoading(false)
    }
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
    inputGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "5px", color: "#555", fontSize: "14px" },
    input: {
      width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px", boxSizing: "border-box",
    },
    select: {
      width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "16px",
      boxSizing: "border-box", backgroundColor: "white", cursor: "pointer",
    },
    button: {
      width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px",
      fontSize: "16px", cursor: "pointer", marginTop: "10px",
    },
    registerButton: {
      width: "100%", padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px",
      fontSize: "16px", cursor: "pointer", marginTop: "10px",
    },
    link: { textAlign: "center", marginTop: "20px" },
    linkText: { color: "#007bff", textDecoration: "none", fontSize: "14px" },
    divider: { textAlign: "center", margin: "20px 0", color: "#666", fontSize: "14px" },
  }

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.form}>
          <h2 style={styles.title}>SwiftCourier Login</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="role">Login As</label>
              <select style={styles.select} id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
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
              <label style={styles.label} htmlFor="password">Password</label>
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
              disabled={loading}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={styles.link}>
            <a href="#" style={styles.linkText} onClick={(e) => e.preventDefault()}>
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
            Register (Customer)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login