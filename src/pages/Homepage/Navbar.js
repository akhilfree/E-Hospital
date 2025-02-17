import React from 'react';

import Banner from './Banner'
import { Link } from 'react-router-dom';
import AboutPage from './AboutPage';
import Service from './Service';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


function Navbar(){
    return(
        <div className='home'>
            <div class="container-fluid py-2 border-bottom d-none d-lg-block">
        <div class="container" style={{marginTop:-10}}>
            <div class="row">
                <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center">
                        <a class="text-decoration-none text-body pe-3" href=""><i class="bi bi-telephone me-2"></i>+91 9176453425</a>
                        <span class="text-body">|</span>
                        <a class="text-decoration-none text-body px-3" href=""><i class="bi bi-envelope me-2"></i>info@example.com</a>
                    </div>
                </div>
                <div class="col-md-6 text-center text-lg-end">
                    <div class="d-inline-flex align-items-center" >
                        <a class="text-body px-2" href="" >
                        <FontAwesomeIcon icon={faFacebook} style={{width:18, height:18}} />
                        </a>
                        <a class="text-body px-2" href="">
                        <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a class="text-body px-2" href="">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a class="text-body px-2" href="">
                        <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a class="text-body ps-2" href="">
                        <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container-fluid sticky-top bg-white shadow-sm">
        <div class="container">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <a href="index.html" class="navbar-brand">
                    <h1 class="m-0 text-uppercase text-primary"><i class="fa fa-clinic-medical me-2"></i>Meditrina</h1>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="index.html" class="nav-item nav-link active">Home</a>
                        <Link to="/register" class="nav-item nav-link">Register</Link>
                        <Link to='/login' class="nav-item nav-link">Login</Link>
                        <a href="price.html" class="nav-item nav-link">Pricing</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <a  href="blog.html" class="dropdown-item">Blog Grid</a>
                                <a href="detail.html" class="dropdown-item">Blog Detail</a>
                                <a href="team.html" class="dropdown-item">The Team</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="appointment.html" class="dropdown-item">Appointment</a>
                                <a href="search.html" class="dropdown-item">Search</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
        <Banner />
        <AboutPage />
        <Service />
        <Footer />
            </div>
    );
}



export default Navbar;