import React ,{useState, useEffect} from 'react';

import './assets/css/style.css';
import './assets/css/fontawsom-all.min.css';
import profile from './assets/images/profile.jpg';
import {  useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../Payment/config';
import Edit from '../Admin/images/logo/edit.png';

function Userhome(props){
    const { state } = useLocation();
    const username = state && state.username;
  const [userData, setUserData] = useState(null);
  const [medData, setMedData] = useState(null);
  const [scanData, setScanData] = useState(null);
  const [labData, setLabData] = useState(null);
  const [datas, setDatas] = useState([]);
  
  
  const [data, setData] = useState([]);
  const[nameList, setNameList] = useState([]);
    const[search, setSearch] = useState("")
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/add_doctor?limit=500')
        .then((response)=>{setNameList(response.data)})
    },[])


  useEffect(() => {
    // Define the first API URL with the username parameter
    const firstApiUrl = `http://127.0.0.1:8000/patient-search/${username}`;
  
    // Make the first API request
    fetch(firstApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Add this line for debugging
        setUserData(data[0]); // Store the first user data object in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
    // Define the second API URL (replace 'secondUsername' with the actual parameter)
    const secondApiUrl = `http://127.0.0.1:8000/med-update/${username}`;
  
    // Make the second API request
    fetch(secondApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Add this line for debugging
        setMedData(data[0]); // Store the first user data object in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      const thirdApiUrl = `http://127.0.0.1:8000/ehr-update/${username}`;
  
    // Make the second API request
    fetch(thirdApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Add this line for debugging
        setScanData(data[0]); // Store the first user data object in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      const forthApiUrl = `http://127.0.0.1:8000/lab-update/${username}`;
  
      // Make the second API request
      fetch(forthApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Add this line for debugging
          setLabData(data[0]); // Store the first user data object in state
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        console.log(JSON.stringify(labData, null, 2));
  
  }, [username]);

        useEffect(() => {
            // Make an HTTP request to fetch data
            fetch(`http://127.0.0.1:8000/scheduled_appoint/${username}`)
              .then((response) => response.json())
              .then((data) => {
                setDatas(data);
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          }, []);
  
    return(
        <div className='Userhome'>
            <div class="container-fluid overcover">
        <div class="container profile-box">
            <div class="top-cover">
                <div class="covwe-inn">
                    <div class="row no-margin">
                        <div class="col-md-3 img-c">
                        {userData ? (
                            <img src={userData.image} alt="" />
                            ) : (
                                <p style={{color:'red'}}>No user data...</p>
                              )}
                        </div>
                        {userData ? (

                        <div class="col-md-9 tit-det">
                            <p style={{fontSize:45, fontWeight:'bold',fontFamily:'century'}}>WELCOME {username}! </p>
                         
                        </div>
                         ) : (
                            <p style={{color:'red'}}>No user data...</p>
              )}
                    </div>
                </div>
            </div>
 
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Profile</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Medications</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="resume-tab" data-toggle="tab" href="#resume" role="tab" aria-controls="resume" aria-selected="false">Doctors</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="gallery-tab" data-toggle="tab" href="#gallery" role="tab" aria-controls="gallery" aria-selected="false">Get an Appointments</a>

              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
              </li>

            </ul>
            <marquee  bgcolor="white" style={{fontWeight:'bold'}}>Visit our website's Symptom-Based Disease Prediction page to begin your journey toward better health. It's simple, intuitive, and a powerful step towards a healthier future.</marquee>
      
            <div class="tab-content" id="myTabContent">
             <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row no-margin home-det">
                      <div class="col-md-4 big-img">
                         
                         {userData ? (
                        <div className='Inner_div shadow' style={{ border: '1px Solid lightgrey' , fontFamily:'century'}}>
                            <ul class="hoby row no-margin" style={{padding: 20}} >
                            <div className='cols' style={{paddingBottom:10, textAlign:'left'}}>
                            <p style={{fontWeight: 'bold', fontSize:20}}>Patient Name : {userData.first_name}&nbsp;{userData.last_name}</p>
                            </div>
                            <div className='cols' style={{paddingBottom:10, textAlign:'left'}}>
                                <p style={{fontWeight: 'bold', fontSize:20}}>Patient Id : {userData.id}</p>
                            </div>
                            <div className='cols' style={{paddingBottom:10, textAlign:'left'}}>
                                <p style={{fontWeight: 'bold', fontSize:20}}>Patient DOB : {userData.dob}</p>
                            </div>
                            <div className='cols' style={{paddingBottom:10, textAlign:'left'}}>
                                <p style={{fontWeight: 'bold', fontSize:20}}>Address : {userData.addressline1}</p>
                            </div>
                           
                        </ul>
                        </div>
                              ) : (
                                <p style={{color:'red'}}>No user data...</p>
                              )}
                          
                        
                      </div>
                      <div class="col-md-8 home-dat">
                          <h2 class="rit-titl"> Skills</h2>
                        <div class="profess-cover row no-margin">
                            <div class="col-md-6">
                                <div class=" prog-row row">
                                    <div class="col-sm-6">
                                        Photoshop
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: '65%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row prog-row">
                                    <div class="col-sm-6">
                                        PHP
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: '85%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="row prog-row">
                                    <div class="col-sm-6">
                                        Web Design
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row prog-row">
                                    <div class="col-sm-6">
                                        Web Development
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="links">
                          <div class="row ">
                              <div class="col-xl-6 col-md-12">
                                  <ul class="btn-link">
                                      <li>
                                          <a href=""><i class="fas fa-paper-plane"></i> Hire Me</a>
                                      </li>
                                      <li>
                                          <a href=""><i class="fas fa-cloud-download-alt"></i> Download Resume</a>
                                      </li>
                                  </ul>
                              </div>
                              <div class="col-xl-6 col-md-12">
                                  <ul class="social-link">
                                      <li><i class="fab fa-facebook-f"></i></li>
                                      <li><i class="fab fa-twitter"></i></li>
                                      <li><i class="fab fa-pinterest-p"></i></li>
                                      <li><i class="fab fa-linkedin-in"></i></li>
                                      <li><i class="fab fa-linkedin-in"></i></li>
                                      <li><i class="fab fa-youtube"></i></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="jumbo-address">
                         <div class="row no-margin">
                                  <div class="col-lg-6 no-padding">
                                  {userData ? (
                                  <table class="addrss-list">
                                      <tbody>
                                      
                                        <tr>
                                          <th>Admission Date</th>
                                          <td>{userData.joining_date}</td>
                                      </tr>
                                      <tr>
                                          <th>Blood Group</th>
                                          <td>{userData.blood_grp}</td>
                                      </tr>
                                      <tr>
                                          <th>Contact No</th>
                                          <td>{userData.phonenumber}</td>
                                      </tr>
                                      
                                  </tbody>
                                  </table>
                                  ) : (
                                    <p>Loading user data...</p>
                                  )}
                          </div>
                          <div class="col-lg-6 no-padding">
                          {userData ? (
                                  <table class="addrss-list">
                                      <tbody>
                                      
                                        <tr>
                                          <th>Gender</th>
                                          <td>{userData.gender}</td>
                                      </tr>
                                      <tr>
                                          <th>Mail Id</th>
                                          <td>{userData.email}</td>
                                      </tr>
                                      <tr>
                                          <th>Contact No</th>
                                          <td>{userData.phonenumber}</td>
                                      </tr>
                                      
                                  </tbody>
                                  </table>
                                  ) : (
                                    <p style={{color:'red'}}>No user data...</p>
                                  )}
                          </div>
                         </div>

                      </div>
                      </div>
                  </div>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div class="data-box">
                       
                          <div class="sec-title">
                                        <h2 style={{marginTop:-45}}>Previous Medications</h2>
                                  </div>
                                  {medData ? (
                           <div class="row " style={{textAlign: 'left', marginLeft:100}}>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginBottom:10}}>
                               <span> Consulted Doctor</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16}}>
                                <span> Start & End Date</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16}}>
                               <span> Primary Diaganosis </span>
                               </div>


                               <div className='col-md-4' style={{fontFamily: 'century'}}>
                               <span> {medData.prescribing_doctor}</span>
                               </div>
                               <div className='col-md-4'>
                               <span> <i>{medData.start_date} - {medData.end_date}</i></span>
                               </div>
                               <div className='col-md-4'>
                               <span>  <i>{medData.primary_diagnosis}</i></span>
                               </div>


                               
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginBottom:10, marginTop:30}}>
                               <span>Allergies</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                                <span>Medication Nname</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                               <span>Dosage</span>
                               </div>


                               <div className='col-md-4' style={{fontFamily: 'century'}}>
                               <span> {medData.allergies}</span>
                               </div>
                               <div className='col-md-4'>
                               <span> <i>{medData.medication_name}</i></span>
                               </div>
                               <div className='col-md-4'>
                               <span>  <i>{medData.Dosage}</i></span>
                               </div>
                               <p style={{fontFamily: 'century', fontWeight: 'bold', fontSize:18, marginTop:30, textAlign:'center'}}>Doctor Conclusion:- {medData.reason_prescription}</p>
                           </div>
                           ) : (
                            <p style={{color:'red', fontWeight: 'bold'}}>No Data Found!...</p>
                          )}
                          <hr />
                          {scanData ? (
                           <div class="row ">
                               <h6 style={{ marginLeft:10, fontSize:20, marginTop:10,}}>Medical Examinations</h6>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginBottom:10, marginTop:30}}>
                               <span>Scan Type</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                                <span>Description</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                               <span>Taken Date</span>
                               </div>


                               <div className='col-md-4' style={{fontFamily: 'century'}}>
                               <span> {scanData.procedure_Details}</span>
                               </div>
                               <div className='col-md-4'>
                               <span> <i>{scanData.desc}</i></span>
                               </div>
                               <div className='col-md-4'>
                               <span>  <i>{scanData.scan_date}</i></span>
                               </div>
                           </div>
                           ) : (
                            <p style={{color:'red', fontWeight: 'bold'}}>No Data Found!...</p>
                          )}
                          <hr />
                          <h6 style={{ marginLeft:10, fontSize:20, marginTop:20, marginBottom:20}}>Lab Reports</h6>
                          {labData ? (
                           <div class="row ">
                               
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginBottom:10, marginTop:30}}>
                               <span>Report Date</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                                <span>Lab Result</span>
                               </div>
                               <div className='col-md-4' style={{fontFamily: 'century', fontWeight: 'bold', fontSize:16, marginTop:30}}>
                               <span>Conclusion</span>
                               </div>


                               <div className='col-md-4' style={{fontFamily: 'century'}}>
                               <span> {labData.report_date}</span>
                               </div>
                               <div className='col-md-4'>
                               <span> <i>{labData.result_Details}</i></span>
                               </div>
                               <div className='col-md-4'>
                               <span>  <i>{labData.conclusion}</i></span>
                               </div>
                           </div>
                           ) : (
                            <p style={{color:'red', fontWeight: 'bold'}}>No Data Found!...</p>
                          )}
                          <hr />
                           
                           
                       </div>
                       
              </div>
              <div class="tab-pane fade exp-cover" id="resume" role="tabpanel" aria-labelledby="contact-tab">
                    <div class="sec-title">
                        <h2>Available Doctors</h2>

                        <div className="container" style={{marginTop: 20,marginLeft:10 }}>
                <div className="row " style={{width:'98%', backgroundColor: 'white'}}>
                    <div className='search' style={{padding:20}}>
                        <div className='row'>
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'style={{width:'30%'}}>
                                <select className='form-control' placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)} style={{border: '1px Solid lightgrey'}}>
                                  <option>---Specialization--- </option>
                                  <option value='Cardiologists'>Cardiologists</option>
                                  <option vlaue='Audiologists'>Audiologists</option>
                                  <option value='Dentist'>Dentist</option>
                                  <option value='ENT Specialist'>ENT Specialist</option>
                                  <option value='Gynecologist'>Gynecologist</option>
                                  <option value='Orthopedic Surgeon'>Orthopedic Surgeon</option>
                                  <option value='Paediatrician'>Paediatrician</option>
                                  <option value='Psychiatrists'>Psychiatrists</option>
                                  <option value=' Veterinarian'> Veterinarian</option>
                                  <option value='Radiologist'>Radiologist</option>
                                  <option value='Pulmonologist'>Pulmonologist</option>
                                  <option value='Endocrinologist'>Endocrinologist</option>
                                  <option value='Oncologist'>Oncologist</option>
                                  <option value='Neurologist'>Neurologist</option>
                                  <option value='Cardiothoracic Surgeon'>Cardiothoracic Surgeon</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
    {nameList
        .filter((item) => {
            if (search === "") {
                return item;
            } else if  (item.specilaization.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        .map((item) => {
            return (
                <div className='col-md-3' key={item.id} style={{marginBottom:10, marginLeft:60, paddingBottom:10}}>
                    <div class="card" style={{ width: '18rem', }}>
                        <img class="card-img-top" src={item.image}alt="Card image cap"  style={{width:400, height:200}}/>
                        <div class="card-body">
                            <h5 class="card-title" style={{color:'black'}}>{item.doctor_name}</h5>
                            <h5 class="card-text">{item.specilaization}</h5>
                            <p class="card-text">{item.years_of_exp} of experience</p>
                           
                        </div>
                    </div>
                </div>
            );
        })}
</div>
       
                </div>
            </div>
                    </div>                    
              </div>
              <div class="tab-pane fade gallcoo" id="gallery" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="row no-margin gallery">
                    <h3>Get An Appointment Here</h3>
                                          
                                          <Link to = {`/appointment/${username}`}  className="btn btn-success" style={{width:250, marginLeft:530, marginTop:20}}>Click Here For Appointment</Link>
                                          
                                        <div className='inner_div' style={{padding:20}}>
                                        <p style={{textAlign: 'left', fontSize:20, fontWeight:'bold',marginLeft:150}}>PREVIOUS APPOINTMENTS</p>
                                        </div>



                                        <table class="table table-hover table-lg" style={{height:150}}>
                                            <caption>List of users</caption>
                                            <thead >
                                                <tr>
                                                <th scope="col" style={{fontWeight: 'bold'}}>#</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Doctor Name</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Specialization</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Appointment Date</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Appointment Time</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Payment Status</th>
                                                <th scope="col" style={{fontWeight: 'bold'}}>Action</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                           

                                            
                                            
                                            {datas.map((appointment, index) => (
                                                // <li key={index}>{appointment.doctor_name}</li> 
                                                <tr>
                                                    <th scope="row">{appointment.id}</th>
                                                    <td>{appointment.doctor_name}</td>
                                                    <td>{appointment.spec}</td>
                                                    <td>{appointment.appointment_date}</td>
                                                    <td>{appointment.appoint_time}</td>
                                                    

                                                    {appointment.payment_status === 'Pending' ? (
                                                        <td style={{color: 'red', fontWeight: 'bold'}}>{appointment.payment_status}</td>
                                                    ): (
                                                        <td style={{color: 'green', fontWeight: 'bold'}}>{appointment.payment_status}</td>
                                                    )}
                                                     {appointment.payment_status === 'Pending' ? (
                                                    <td>
                                                        <form action={`${API_URL}/create-checkout-session/${appointment.id}/`} method='POST'>
                                                            <button type='submit' className='btn btn-danger'>Make Payment</button>
                                                        </form>
                                                    </td>
                                                    ): (
                                                        <td> <Link to={`#`}><img src={Edit} alt='dgfhdg' style={{width:25, height:25,marginLeft:30}} /></Link></td>
                                                        )}

                                                </tr>
                                                    
                                                ))}
                                                

                                                
                                            
                                                
                                            </tbody>
                                            </table>




                                        
                    </div>
              </div>
              <div class="tab-pane fade contact-tab" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  <div class="row no-margin">
                                          <div class="col-md-6 no-padding">
                                               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176144.0450019627!2d-107.79423426090409!3d38.97644533805396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C+USA!5e0!3m2!1sen!2sin!4v1547222354537"  frameborder="0" style={{border: 0}} allowfullscreen></iframe>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="row cont-row no-margin">
                                                  <div class="col-sm-6">
                                                      <input placeholder="Enter Full Name" type="text" class="form-control form-control-sm" />
                                                  </div>
                                                   <div class="col-sm-6">
                                                      <input placeholder="Enter Email Address" type="text" class="form-control form-control-sm" />
                                                  </div>
                                              </div>
                                              <div class="row cont-row no-margin">
                                                  <div class="col-sm-6">
                                                      <input placeholder="Enter Mobile Number" type="text" class="form-control form-control-sm" />
                                                  </div>
                                                   
                                              </div>
                                              <div class="row cont-row no-margin">
                                                  <div class="col-sm-12">
                                                     <textarea placeholder="Enter your Message" class="form-control form-control-sm" rows="10"></textarea>
                                                  </div>
                                                  
                                              </div>
                                              <div class="row cont-row no-margin">
                                                  <div class="col-sm-6">
                                                      <button class="btn btn-sm btn-primary">Send Message</button>
                                                  </div>
                                                   
                                              </div>
                                          </div>
                                      </div>
              </div>
            </div>
        </div>
    </div>

        </div>
    );
}
export default Userhome;