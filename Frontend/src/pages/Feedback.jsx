// FeedbackForm.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar'
export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    courierId: '',
    rating: '',
    comment: '',
    deliveryDate: '',
    deliveryTime: '',
    packageCondition: '',
    courierBehaviour: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Feedback:', formData);
    // You can add your API POST call here
  };

  const handleReset = () => {
    setFormData({
      courierId: '',
      rating: '',
      comment: '',
      deliveryDate: '',
      deliveryTime: '',
      packageCondition: '',
      courierBehaviour: '',
    });
  };

  return (
    <>
      <Navbar />
    
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="text-center border-bottom pb-2 mb-4">Feedback</h3>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Courier ID</label>
              <input
                type="text"
                className="form-control"
                name="courierId"
                value={formData.courierId}
                onChange={handleChange}
                placeholder="Enter Courier ID"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Rating</label>
              <select
                className="form-select"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Delivery Date</label>
              <input
                type="date"
                className="form-control"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Time of Delivery</label>
              <input
                type="time"
                className="form-control"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Package Condition</label>
              <select
                className="form-select"
                name="packageCondition"
                value={formData.packageCondition}
                onChange={handleChange}
              >
                <option value="">Select Condition</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
                <option value="Leaking">Leaking</option>
                <option value="Missing Items">Missing Items</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Courier Boy Behaviour</label>
              <select
                className="form-select"
                name="courierBehaviour"
                value={formData.courierBehaviour}
                onChange={handleChange}
              >
                <option value="">Select Behaviour</option>
                <option value="Professional">Professional</option>
                <option value="Polite">Polite</option>
                <option value="Rude">Rude</option>
                <option value="Unresponsive">Unresponsive</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Comment</label>
            <textarea
              className="form-control"
              name="comment"
              rows="3"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write your feedback here..."
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Submit Feedback</button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
