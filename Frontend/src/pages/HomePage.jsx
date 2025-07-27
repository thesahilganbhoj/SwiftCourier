import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const SwiftCourierLanding = () => {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "SwiftCourier made my business deliveries so much easier! Fast and reliable service every time.",
      rating: 5,
      location: "Mumbai",
    },
    {
      name: "Rajesh Kumar",
      review:
        "Amazing tracking system! I could see exactly where my package was at all times. Highly recommended!",
      rating: 5,
      location: "Delhi",
    },
    {
      name: "Priya Sharma",
      review:
        "The customer support is outstanding. They helped me resolve my delivery issue within minutes.",
      rating: 5,
      location: "Bangalore",
    },
  ]

  const handleCTAClick = (action) => {
    switch (action) {
      case "Place Order":
        navigate("/customer/add-courier")
        break
      case "Track Order":
        navigate("/customer/track-courier")
        break
      case "Order History":
        navigate("/customer/order-history")
        break
      case "Support & Help":
        navigate("/customer/feedback")
        break
      case "Place Order Now":
        navigate("/customer/add-courier")
        break
      default:
        console.log("Unknown Action")
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <>
      <Navbar />

      <div className="landing-page">
        {/* HERO SECTION */}
        <section
          className="hero-section d-flex align-items-center"
          style={{
            minHeight: "90vh",
            background: "linear-gradient(135deg, #cce6ff 0%, #99d6ff 100%)",
            color: "#003366",
            padding: "80px 0",
          }}
        >
          <div className="container text-center">
            <h1 className="display-2 fw-bold mb-4">
              Welcome to SwiftCourier
            </h1>
            <p className="lead fs-4 mb-4">
              Fast, Reliable & Secure Deliveries at Your Fingertips
            </p>
            <p className="mb-5 fs-5">
              Send and track your parcels easily with real-time updates and secure delivery.
            </p>

            {/* CTA Buttons */}
            <div className="row g-4 justify-content-center">
              {[
                { label: "Place Order", icon: "bi-box-seam" },
                { label: "Track Order", icon: "bi-geo-alt" },
                { label: "Order History", icon: "bi-clock-history" },
                { label: "Support & Help", icon: "bi-headset" },
              ].map((btn) => (
                <div key={btn.label} className="col-6 col-md-3">
                  <button
                    className="btn btn-primary btn-lg w-100 py-3 rounded-4 shadow-sm"
                    onClick={() => handleCTAClick(btn.label)}
                    style={{ fontSize: "1.1rem" }}
                  >
                    <i className={`bi ${btn.icon} me-2`}></i> {btn.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-6" style={{ background: "#f2f8ff" }}>
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">Why Choose SwiftCourier?</h2>
            <div className="row g-4">
              {[
                { title: "Fast Delivery", icon: "bi-lightning-charge", color: "text-primary" },
                { title: "Live Tracking", icon: "bi-eye", color: "text-success" },
                { title: "Secure Handling", icon: "bi-shield-check", color: "text-warning" },
                { title: "24/7 Support", icon: "bi-headset", color: "text-info" },
              ].map((feature) => (
                <div key={feature.title} className="col-md-6 col-lg-3">
                  <div
                    className="card h-100 shadow-sm p-4 rounded-4"
                    style={{ minHeight: "220px" }}
                  >
                    <i
                      className={`bi ${feature.icon} ${feature.color} fs-1 mb-3`}
                    ></i>
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="text-muted small">
                      {feature.title === "Fast Delivery" && "Get your parcels delivered in record time."}
                      {feature.title === "Live Tracking" && "Know where your package is anytime."}
                      {feature.title === "Secure Handling" && "Safe packaging & careful handling."}
                      {feature.title === "24/7 Support" && "Always here to help you anytime."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-6">
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">How It Works</h2>
            <div className="row g-4">
              {[
                { step: "1", title: "Book Your Order", text: "Fill pickup & delivery details easily." },
                { step: "2", title: "Swift Pickup", text: "Our partner picks up your package quickly." },
                { step: "3", title: "On-time Delivery", text: "Delivered safely with confirmation." },
              ].map((step, idx) => (
                <div key={step.step} className="col-md-4">
                  <div className="card shadow-sm p-4 rounded-4 h-100">
                    <span
                      className={`badge fs-4 rounded-circle mb-3 ${
                        idx === 0
                          ? "bg-primary"
                          : idx === 1
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                      style={{ width: "50px", height: "50px", lineHeight: "40px" }}
                    >
                      {step.step}
                    </span>
                    <h5 className="fw-bold">{step.title}</h5>
                    <p className="text-muted small">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-6" style={{ background: "#f2f8ff" }}>
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">What Our Customers Say</h2>
            <div
              className="card mx-auto shadow-sm p-5 rounded-4"
              style={{ maxWidth: "700px" }}
            >
              <div className="mb-3">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning fs-5"></i>
                ))}
              </div>
              <blockquote className="blockquote fs-5">
                “{testimonials[currentTestimonial].review}”
              </blockquote>
              <h5 className="mt-3 fw-bold">
                {testimonials[currentTestimonial].name}
              </h5>
              <small className="text-muted">
                {testimonials[currentTestimonial].location}
              </small>
              <div className="mt-4">
                <button
                  className="btn btn-outline-primary me-2 rounded-pill px-4"
                  onClick={prevTestimonial}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={nextTestimonial}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="py-6 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #4da6ff 0%, #3399ff 100%)",
          }}
        >
          <div className="container">
            <h2 className="fw-bold display-5 mb-3">
              Ready for hassle-free courier service?
            </h2>
            <p className="lead mb-4">
              Join thousands who trust SwiftCourier for fast, secure deliveries.
            </p>
            <button
              className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-sm"
              onClick={() => handleCTAClick("Place Order Now")}
            >
              <i className="bi bi-rocket-takeoff me-2"></i> Place Order Now
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-dark text-center text-white py-4">
          <p className="mb-0 fs-6">
            © 2025 SwiftCourier | Delivering Trust, One Parcel at a Time
          </p>
        </footer>
      </div>
    </>
  )
}

export default SwiftCourierLanding
