import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import InsideNavbar1 from "../Admin/InsideNavbar1";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ConfirmAppointment(){
    const { username, doctor_name } = useParams();
    const [result, setResult] = useState({
      username : '',
      first_name : '',
      last_name : '',
    });
    const [result1, setResult1] = useState({

      doctor_name : '',
      spec : '',
      // Initial value for the first_name field
    });
    const [result2, setResult2] = useState({
      appoint_time : '',
      // Initial value for the first_name field
    });


    

  
    // Fetch patient data using patient name
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/patient-search/${username}`)
        .then((response) => {
          setResult(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching patient data:', error);
        });
    }, [username]);
  
    // Fetch doctor data using doctor name
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/doctor-search/${doctor_name}`)
        .then((response) => {
          setResult1(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
    }, [doctor_name]);


    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/doctor-schedule/${doctor_name}`)
        .then((response) => {
          setResult2(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
    }, [doctor_name]);

    const navigate = useNavigate();


const [appointment_date, setAppointment_date] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('username', result.username); // Define 'result' variable
  formData.append('first_name', result.first_name);
  formData.append('last_name', result.last_name);
  formData.append('doctor_name', result1.doctor_name); // Define 'result1' variable
  formData.append('spec', result1.specilaization); // Fix the typo
  formData.append('appointment_date', appointment_date);
  formData.append('appoint_time', result2.consultation_time); // Define 'result2' variable
  formData.append('consult_fee', result2.consult_fee);
  formData.append('given_slot', '0'); // You may set this value as needed
  formData.append('payment_status', 'Pending');
  formData.append('appoint_status', '0');
  console.log('Username is',formData.get('first_name'))

  try {
    await axios.post('http://127.0.0.1:8000/scheduled_appoint/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle success or navigate to the user page.
    toast.success("Appointment Added Successfully", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    });
    navigate(`/user`, { state: { username } }); // Redirect to the user page
    console.log('Appointment Added Successfully');
  } catch (error) {
    // Handle error.
    console.log(error);
    console.log('Appointment Not Added Successfully');
  }
};

    return(
        <div className="" style={{marginBottom:20}}>
          <InsideNavbar1 />
           

            <div className="container" style={{paddingTop:50, width:'60%', paddingBottom:46}}>
                <div className="inner_div shadow" style={{ border: '1px solid lightgrey',}}>
                  
                  <h4 style={{  textTransform: 'uppercase', marginTop:20, marginLeft:50,textAlign:'left', marginLeft:100, fontWeight:900, fontSize:20}}>Patient Details</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row" >
                        <div className="col-md-4" style={{margin:20,textAlign:'left',marginLeft:80,marginTop:20}}>
                          {result.image ? (
                            <img src={result.image} alt="Patient" class="img-fluid rounded-full" style={{width:200, borderRadius:'50%'}}/>
                            ) : (
                                <p>No image available</p>
                            )}
                        </div> 
                        <div className="col-md-6" style={{ textAlign: 'left',marginTop:20,fontSize:20,lineHeight: '1.5'}}>

                        {result ? (
                          <div>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result.first_name} {result.last_name}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result.dob}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2,textTransform: 'lowercase',}}>{result.email}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result.phonenumber}</h3>

                            
                            </div>
                            ) : (
                                <p>No image available</p>
                            )}
                          
                          </div> 
                          <hr style={{width:'95%', marginLeft: 20}}></hr>

                          <h4 style={{  textTransform: 'uppercase', marginTop:20, marginLeft:50,textAlign:'left', marginLeft:100, fontWeight:900, fontSize:20,}}>Doctor Details</h4>


                          <div className="col-md-4" style={{margin:20,textAlign:'left',marginLeft:80,marginTop:20}}>
                          {result1 ? (
                            <img src={result1.image} alt="Patient" class="img-fluid rounded-full" style={{width:200, borderRadius:'50%'}}/>
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div className="col-md-6" style={{ textAlign: 'left',marginTop:20,fontSize:20,lineHeight:2}}>

                            {result ? (
                          <div>

                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result1.doctor_name}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2  }}>{result1.specilaization}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result1.years_of_exp}</h3>
                            <h3 style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, background: 'lightlavender', border: 'none', lineHeight:2}}>{result1.phonenumber}</h3>
                    
                              
                            </div>
                            ) : (
                                <p>No image available</p>
                            )}
                          
                          </div> 

                          <hr style={{width:'95%', marginLeft: 20}}></hr>


                          
                              <div className="inner_div" style={{padding: 30}}>

                                  <div className="row" >
                                    <div className="col-md-3" >
                                      <label style={{fontWeight: 'bold'}}>Appointment Date</label>
                                    </div>
                                    <div className="col-md-3">
                                    <input type="date" className="form-control" value={appointment_date} required onChange={(e) => setAppointment_date(e.target.value)}  style={{fontWeight: 'bold'}}></input>
                                    </div>
                                    <div className="col-md-3">
                                    <label style={{fontWeight: 'bold'}}>Consulation Time</label>
                                    </div>
                                    <div className="col-md-3">
                                    
                                        <p style={{fontWeight: 'bold'}}>{result2.consultation_time}</p>
                                       
                                    </div>
                                    <div className="col-md-3" style={{marginLeft: 10}}>
                                    
                                        <p style={{fontWeight: 'bold'}}>Consultation Fee ₹{result2.consult_fee}</p>
                                        
                                    </div>
                                    
                                    
                                  </div>

                              </div>
                         


                      </div>

                      <button type="submit" style={{marginBottom:30 , marginLeft:350}}  className="btn btn-success">Get an Appointment</button>
               
                    </form>
                  
                   

                </div>
            </div>
        </div>
    );
}