import { useState } from "react"
import Navbar from "../components/Navbar"
function CustomerProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [customerData, setCustomerData] = useState({
        id: "CUST001",
        name: "Prashant Deshmukh",
        email: "prashant.deshmukh@email.com",
        address: "Govindpuram, Ghaziabad, Uttar Pradesh 201013",
    })

    const [editData, setEditData] = useState({ ...customerData })

    const handleEdit = () => {
        setIsEditing(true)
        setEditData({ ...customerData })
    }

    const handleSave = (e) => {
        e.preventDefault()
        setCustomerData({ ...editData })
        setIsEditing(false)
        console.log("Updated customer data:", editData)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditData({ ...customerData })
    }

    const handleInputChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }))
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
        profileCard: {
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "600px",
        },
        header: {
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #28a745",
            paddingBottom: "20px",
        },
        title: {
            color: "#333",
            fontSize: "28px",
            marginBottom: "5px",
        },
        subtitle: {
            color: "#666",
            fontSize: "16px",
        },
        fieldGroup: {
            marginBottom: "20px",
        },
        label: {
            display: "block",
            marginBottom: "5px",
            color: "#555",
            fontSize: "14px",
            fontWeight: "bold",
        },
        input: {
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            boxSizing: "border-box",
        },
        textarea: {
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
            boxSizing: "border-box",
            minHeight: "80px",
            resize: "vertical",
        },
        displayValue: {
            padding: "12px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "4px",
            fontSize: "16px",
            color: "#333",
        },
        readOnlyField: {
            backgroundColor: "#e9ecef",
            color: "#6c757d",
        },
        buttonGroup: {
            display: "flex",
            gap: "10px",
            marginTop: "30px",
            justifyContent: "center",
        },
        button: {
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            minWidth: "120px",
        },
        editButton: {
            backgroundColor: "#28a745",
            color: "white",
        },
        saveButton: {
            backgroundColor: "#007bff",
            color: "white",
        },
        cancelButton: {
            backgroundColor: "#6c757d",
            color: "white",
        },
    }

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <div style={styles.profileCard}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Customer Profile</h1>
                        <p style={styles.subtitle}>SwiftCourier Customer Details</p>
                    </div>

                    <form onSubmit={handleSave}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="id">
                                Customer ID
                            </label>
                            <div style={{ ...styles.displayValue, ...styles.readOnlyField }}>{customerData.id}</div>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="name">
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    style={styles.input}
                                    type="text"
                                    id="name"
                                    value={editData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    required
                                />
                            ) : (
                                <div style={styles.displayValue}>{customerData.name}</div>
                            )}
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="email">
                                Email Address
                            </label>
                            {isEditing ? (
                                <input
                                    style={styles.input}
                                    type="email"
                                    id="email"
                                    value={editData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    required
                                />
                            ) : (
                                <div style={styles.displayValue}>{customerData.email}</div>
                            )}
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="address">
                                Address
                            </label>
                            {isEditing ? (
                                <textarea
                                    style={styles.textarea}
                                    id="address"
                                    value={editData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    required
                                />
                            ) : (
                                <div style={styles.displayValue}>{customerData.address}</div>
                            )}
                        </div>

                        <div style={styles.buttonGroup}>
                            {isEditing ? (
                                <>
                                    <button
                                        style={{ ...styles.button, ...styles.saveButton }}
                                        type="submit"
                                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        style={{ ...styles.button, ...styles.cancelButton }}
                                        type="button"
                                        onClick={handleCancel}
                                        onMouseOver={(e) => (e.target.style.backgroundColor = "#5a6268")}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    style={{ ...styles.button, ...styles.editButton }}
                                    type="button"
                                    onClick={handleEdit}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile