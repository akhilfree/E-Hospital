import React from "react";
import './styles/css/style.css';
import { Link } from "react-router-dom";

function Banner(){
    return(
        <div class="container-fluid bg-primary py-5 mb-5 hero-header">
        <div class="container py-5">
            <div class="row justify-content-start">
                <div class="col-lg-8 text-center text-lg-start">
                    <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5" style={{borderColor: 'rgba(255, 255, 255, 0.3)',}}>Welcome To Meditrina</h5>
                    <h1 class="display-1 text-white mb-md-4">Best Healthcare Solution In Your City</h1>
                    <div class="pt-2">
                        <Link to='/login' class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Doctor</Link>
                        <Link to='/login' class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Appointment</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Banner;