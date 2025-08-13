import React from 'react'
import ContactUs1 from './images/ContactUs1.jpg'

function ContactUs() {
    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col'>
                    <h1 className='utext mb-5'>Contact Us</h1>
                </div>
                <div className='col'>
                    <img src={ContactUs1} alt='ContactUs1' style={{ width: '600px' }} />
                </div>
            </div>
            <div className='container my-5 py-5'>
                <div className='d-flex justify-content-center'>
                    <h2 className='utext'>Support when you need it</h2>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <div className='row'>
                        <div className='col'>
                            <h4>Customer Service</h4>
                            <p className='lead'>8007592194</p>
                            <p className='lead'>9284926333</p>
                        </div>
                        <div className='col'>
                            <h4>Email Support</h4>
                            <p className='lead'>support@courierservice.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs