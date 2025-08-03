import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import customerService from "../services/customer";

function CustomerProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [customerData, setCustomerData] = useState(null);
    const [editData, setEditData] = useState({});
    const customerId = 1;

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await customerService.getCustomerProfile(customerId);
                console.log("Customer Response:", res.data);
                setCustomerData(res.data);
                setEditData(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch customer data:", error);
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [customerId]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditData({
            customerId: customerData.customerId || "",
            name: customerData.name || "",
            email: customerData.email || "",
            address: customerData.address || "",
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                customerId: customerId,
                name: editData.name,
                email: editData.email,
                address: editData.address,
            };
            const res = await customerService.updateCustomerProfile(customerId, payload);
            const updatedCustomer = res.data.data;
            
            setCustomerData(updatedCustomer);
            setEditData(updatedCustomer);
            setIsEditing(false);
            console.log("Profile updated:", updatedCustomer);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...customerData });
    };

    const handleInputChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
    if (!customerData) return <p style={{ textAlign: "center" }}>Customer data not available.</p>;

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
            minHeight: "80px",
            resize: "vertical",
            boxSizing: "border-box",
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
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.profileCard}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Customer Profile</h1>
                        <p style={styles.subtitle}>SwiftCourier Customer Details</p>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Customer ID</label>
                        <div style={{ ...styles.displayValue, ...styles.readOnlyField }}>
                            {customerData.customerId}
                        </div>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Full Name</label>
                        {isEditing ? (
                            <input
                                style={styles.input}
                                type="text"
                                value={editData.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                required
                            />
                        ) : (
                            <div style={styles.displayValue}>{customerData.name}</div>
                        )}
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email Address</label>
                        {isEditing ? (
                            <input
                                style={styles.input}
                                type="email"
                                value={editData.email || ""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                required
                            />
                        ) : (
                            <div style={styles.displayValue}>{customerData.email}</div>
                        )}
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Address</label>
                        {isEditing ? (
                            <textarea
                                style={styles.textarea}
                                value={editData.address || ""}
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
                                    type="button"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                                <button 
                                    style={{ ...styles.button, ...styles.cancelButton }} 
                                    type="button" 
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button 
                                style={{ ...styles.button, ...styles.editButton }} 
                                type="button" 
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;