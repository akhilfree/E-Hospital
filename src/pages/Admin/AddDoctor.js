import React, { useState, } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddStudent() {

  const navigate = useNavigate();
  const [doctor_name, setDoctor_name] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [specilaization, setSpecilaization] = useState('');
  const [license_expiry_date, setLicense_expiry_date] = useState(null);
  const [years_of_exp, setYears_of_exp] = useState('');
  const [availability, setAvailability] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('doctor_name', doctor_name);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    formData.append('address', address);
    formData.append('specilaization', specilaization);
    formData.append('license_expiry_date', license_expiry_date);
    formData.append('years_of_exp', years_of_exp);
    formData.append('availability', availability);
    formData.append('image', image);
    formData.append('status', '0')
    console.log(JSON.stringify(formData, null, 2));
    console.log('Image is' +formData.image)
    try {
      await axios.post('http://127.0.0.1:8000/add_doctor/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to student list page.
      toast.success("Doctor Inserted Successful", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      navigate('/add_doctors'); // Redirect to success page
      console.log('Student Inserted Successfully')
    } catch (error) {
      // Handle error.
      console.log('Student Not Inserted Successfully')
    }
  };


  return (
    <div className='reg_form'> 
       <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{width:880, height:780,marginTop:60,marginLeft:330, backgroundColor:'white', opacity:0.5}}>
          <div className='form_reg' style={{padding:50}}>
               <h2 style={{fontWeight:'bold', marginTop:-25, fontFamily: 'fangsong',}}>ADD DOCTOR DETAILS</h2>
                 
                <form onSubmit={handleSubmit}>
                  <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>
                        <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR NAME</label>
                              <input type="text" placeholder="Doctor Name" className='form-control' value={doctor_name} onChange={(e) => setDoctor_name(e.target.value)} required />
                            </div>
                          </div>  
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DATE OF BRITH</label>
                               <input
                                  type="date"
                                  placeholder="Dob" className='form-control'
                                  value={dob} required
                                  onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>GENDER</label>
                              <select className='form-control' value={gender} onChange={(e) => setGender(e.target.value)} >
                                <option >Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Others'>Others</option>
                              </select>
                            </div>
                          </div>


                      
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>MAIL ID</label>
                               <input
                          type="mail"
                          placeholder="Email" className='form-control'
                          value={email} required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                            </div>
                          </div>




                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>MOB NO</label>
                               <input
                          type="text"
                          placeholder="Phone Number" className='form-control'
                          value={phonenumber} required
                          onChange={(e) => setPhonenumber(e.target.value)}
                        />

                            </div>
                          </div>
                          
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>ADDRESSLINE</label>
                               <input
                                  type="text"
                                  placeholder="Address" className='form-control'
                                  value={address} required
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                          </div>
                        

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>SPECIALIZATION</label>
                               {/* <input
                                  type="text"
                                  placeholder="Specilaization" className='form-control'
                                  value={specilaization} required
                                  onChange={(e) => setSpecilaization(e.target.value)}
                                /> */}

                                <select className='form-control' value={specilaization} onChange={(e) => setSpecilaization(e.target.value)} required >
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

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-195,marginBottom:10,fontWeight:'bold'}}>LICENSE EXPIRY DATE</label>
                               <input
                                  type="date"
                                  placeholder="license_expiry_date" className='form-control'
                                  value={license_expiry_date} required
                                  onChange={(e) => setLicense_expiry_date(e.target.value)}
                                />
                            </div>
                          </div>
                        
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>EXPERIENCE</label>
                                  <select placeholder="Years Of Experience" className='form-control' value={years_of_exp} required onChange={(e) => setYears_of_exp(e.target.value)}>
                                    <option value='1 Year'>1 Year</option>
                                    <option value='2 Year'>2 Year</option>
                                    <option value='3 Year'>3 Year</option>
                                    <option value='4 Year'>4 Year</option>
                                    <option value='5 Year'>5 Year</option>
                                    <option value='6 Year'>6 Year</option>
                                    <option value='7 Year'>7 Year</option>
                                    <option value='8 Year'>8 Year</option>
                                    <option value='9 Year'>9 Year</option>
                                    <option value='>10 Years'> More than 10 Year</option>
                                   
                                  </select>
                            </div>
                          </div>


                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>AVALILABILTY</label>
                               <input
                                  type="text"
                                  placeholder="Availability" className='form-control'
                                  value={availability} required
                                  onChange={(e) => setAvailability(e.target.value)}
                                />

                            </div>
                          </div>
                          
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR PIC</label>
                               <input
                                    type="file"
                                    accept="image/*" className='form-control' required
                                    onChange={(e) => setImage(e.target.files[0])}
                                  />


                            </div>
                          </div>
                    </div>
                    <button type ='submit' className='btn btn-primary' style={{marginTop:15}}>Submit</button>
                  </form>
        </div>        
      </div>
    </div>            
  );
}

export default AddStudent;
