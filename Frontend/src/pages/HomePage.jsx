import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import heroBackground from '../images/hero-background.png'; // Import the generated image

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
          className="hero-section d-flex align-items-center position-relative overflow-hidden mt-16 py-16" // Added mt-16 and changed to py-16
          style={{
            minHeight: "90vh",
            background: `linear-gradient(135deg, rgba(204, 230, 255, 0.9) 0%, rgba(153, 214, 255, 0.9) 100%), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: "#003366",
          }}
        >
          <div className="container text-center position-relative z-1">
            <h1 className="display-2 fw-bold mb-4 animate__animated animate__fadeInDown">
              Welcome to SwiftCourier
            </h1>
            <p className="lead fs-4 mb-4 animate__animated animate__fadeInUp animate__delay-0-5s">
              Fast, Reliable & Secure Deliveries at Your Fingertips
            </p>
            <p className="mb-5 fs-5 animate__animated animate__fadeInUp animate__delay-1s">
              Send and track your parcels easily with real-time updates and secure delivery.
            </p>

            {/* CTA Buttons */}
            <div className="row g-4 justify-content-center animate__animated animate__fadeInUp animate__delay-1-5s">
              {[
                { label: "Place Order", icon: "bi-box-seam" },
                { label: "Track Order", icon: "bi-geo-alt" },
                { label: "Order History", icon: "bi-clock-history" },
                { label: "Support & Help", icon: "bi-headset" },
              ].map((btn) => (
                <div key={btn.label} className="col-6 col-md-3">
                  <button
                    className="btn btn-primary btn-lg w-100 py-3 rounded-4 shadow-sm hover-scale"
                    onClick={() => handleCTAClick(btn.label)}
                    style={{ fontSize: "1.1rem", transition: "transform 0.2s ease-in-out" }}
                  >
                    <i className={`bi ${btn.icon} me-2`}></i> {btn.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="mt-16 py-16" style={{ background: "#f2f8ff" }}> {/* Added mt-16 and changed to py-16 */}
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">Why Choose SwiftCourier?</h2>
            <div className="row g-4">
              {[
                { title: "Fast Delivery", icon: "bi-lightning-charge", description: "Get your parcels delivered in record time." },
                { title: "Live Tracking", icon: "bi-eye", description: "Know where your package is anytime." },
                { title: "Secure Handling", icon: "bi-shield-check", description: "Safe packaging & careful handling." },
                { title: "24/7 Support", icon: "bi-headset", description: "Always here to help you anytime." },
              ].map((feature) => (
                <div key={feature.title} className="col-md-6 col-lg-3 d-flex">
                  <div
                    className="card h-100 shadow-sm p-4 rounded-4 d-flex flex-column justify-content-center align-items-center text-center"
                    style={{ minHeight: "220px", transition: "transform 0.2s ease-in-out" }}
                  >
                    <i
                      className={`bi ${feature.icon} fs-1 mb-3 text-primary`}
                    ></i>
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="text-muted small flex-grow-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16 py-16"> {/* Added mt-16 and changed to py-16 */}
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">How It Works</h2>
            <div className="row g-4">
              {[
                { step: "1", title: "Book Your Order", text: "Fill pickup & delivery details easily." },
                { step: "2", title: "Swift Pickup", text: "Our partner picks up your package quickly." },
                { step: "3", title: "On-time Delivery", text: "Delivered safely with confirmation." },
              ].map((step, idx) => (
                <div key={step.step} className="col-md-4 d-flex">
                  <div className="card shadow-sm p-4 rounded-4 h-100 d-flex flex-column justify-content-center align-items-center text-center">
                    <span
                      className={`badge fs-4 rounded-circle mb-3 bg-primary`}
                      style={{ width: "50px", height: "50px", lineHeight: "40px" }}
                    >
                      {step.step}
                    </span>
                    <h5 className="fw-bold">{step.title}</h5>
                    <p className="text-muted small flex-grow-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-16 py-16" style={{ background: "#f2f8ff" }}> {/* Added mt-16 and changed to py-16 */}
          <div className="container text-center">
            <h2 className="fw-bold display-5 mb-5">What Our Customers Say</h2>
            <div
              className="card mx-auto shadow-lg p-5 rounded-4 border-0"
              style={{ maxWidth: "700px" }}
            >
              <div className="mb-3">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning fs-5"></i>
                ))}
              </div>
              <blockquote className="blockquote fs-5 mb-4">
                “{testimonials[currentTestimonial].review}”
              </blockquote>
              <h5 className="mt-3 fw-bold">
                {testimonials[currentTestimonial].name}
              </h5>
              <small className="text-muted">
                {testimonials[currentTestimonial].location}
              </small>
              <div className="mt-4 d-flex justify-content-center">
                <button
                  className="btn btn-outline-primary me-3 rounded-pill px-4 py-2"
                  onClick={prevTestimonial}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button
                  className="btn btn-outline-primary rounded-pill px-4 py-2"
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
          className="mt-16 py-16 text-center text-white" // Added mt-16 and changed to py-16
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
              className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale"
              onClick={() => handleCTAClick("Place Order Now")}
              style={{ transition: "transform 0.2s ease-in-out" }}
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
