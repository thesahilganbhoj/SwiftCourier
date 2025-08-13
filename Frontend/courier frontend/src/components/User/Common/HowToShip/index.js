import React from 'react'
import video3 from './images/expressthree.mp4'
import { Link } from 'react-router-dom'

function HowToShip() {
    return (
        <div className='container my-5' >
            <div className='row py-5'>
                <div className='col'>
                    <h1 className='utext mb-5'>How To Ship a Parcel</h1>
                    <p className='lead'>Never remember addresses? No problem. Save them to your address book.</p>
                    <Link className='btn btn-warning mt-3' to={'/createashipment'}>Ship Now</Link>
                </div>
                <div className='col'>
                    {/* <img src={HowToShip1} alt='HowToShip1' style={{ width: '600px' }} /> */}
                    <video src={video3} autoPlay loop muted style={{maxWidth: "600px" }} />
                </div>
            </div>
            <div className='container mx-auto my-5' style={{ width: '800px' }}>
                <div className='row my-5'>
                    <div className='col-1'>
                        <h2><i className='bi bi-1-circle-fill'></i></h2>
                    </div>
                    <div className='col'>
                        <h2 className='utext mb-5'>Get Your Parcel Ready</h2>
                        <p className='lead'>First things first – you need to pack your items in a sturdy box.</p>
                        <p className='lead'>
                            <ul>
                                <li>Seal your box with plastic or nylon tape at least 5 cm wide. Don’t use duct tape.</li>
                                <li>Wrap items separately and use cushioning material.</li>
                                <li>You’ll need to know the dimensions and weight of your box.</li>
                            </ul>
                        </p>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-1'>
                        <h2><i className='bi bi-2-circle-fill'></i></h2>
                    </div>
                    <div className='col'>
                        <h2 className='utext mb-5'>Create a Shipment</h2>
                        <p className='lead'>It's easy creating a shipment</p>
                        <p className='lead'>
                            <ul>
                                <li>Enter pickup and delivery addresses.</li>
                                <li>Tell us what you want to ship.</li>
                                <li>Choose how fast you want your parcel to arrive.</li>
                                <li>See how much it will cost.</li>
                                <li>Pay by card or online.</li>
                            </ul>
                        </p>
                        <Link className='btn btn-warning mt-3' to={'/createashipment'}>Create a Shipment</Link>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-1'>
                        <h2><i className='bi bi-3-circle-fill'></i></h2>
                    </div>
                    <div className='col'>
                        <h2 className='utext mb-5'>We’ll Do the Rest</h2>
                        <p className='lead'>Almost done!</p>
                        <p className='lead'>
                            <ul>
                                <li>We can come to you (for an additional fee).</li>
                                <li>Drop it off at a Navi location.</li>
                                <li>Hand the parcel to your friendly neighbourhood driver.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowToShip