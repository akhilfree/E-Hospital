import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import './styles/css/reg.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Reg() {

function getDate() {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const date = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${date}`;
}

const navigate = useNavigate();
const [first_name, setFirst_name] = useState('');
const [last_name, setLast_name] = useState('');
const [dob, setDob] = useState(null);
const [email, setEmail] = useState('');
const [phonenumber, setPhonenumber] = useState('');
const [gender, setGender] = useState('');
const [joining_date, setCurrentDate] = useState(getDate());
const [addressline1, setAddressline1] = useState('');
const [blood_grp, setBlood_grp] = useState('');
const [hospital_id, setHospital_id] = useState(null);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [image, setImage] = useState(null);

const checkUsernameAvailability = async () => {
  // ... (your existing validation code)
  const requiredFields = [first_name, last_name, dob, email, phonenumber, gender, addressline1, blood_grp, hospital_id, username, password, image];
  console.log(requiredFields)
 if (first_name === '') {
    
   console.log('One or more required fields are empty.');
   toast.warning("First name required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }
 if (!last_name) {
    
   console.log('Last name is empty.');
   toast.warning("Last name required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 if (!dob) {
    
   console.log('Last name is empty.');
   toast.warning("Date Of Birth required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email || !emailRegex.test(email)) {
    
   console.log('Invalid email format.');
   toast.warning("Valid email required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 const mobileRegex = /^[0-9]{10}$/;
 if (!phonenumber || !mobileRegex.test(phonenumber)) {
    
   console.log('Invalid mobile number format.');
   toast.warning("Valid mobile number required (10 digits)", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 if (!gender) {
    
   console.log('Last name is empty.');
   toast.warning("Gender required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 if (!addressline1) {
    
   console.log('Last name is empty.');
   toast.warning("Address required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 if (!blood_grp) {
    
   console.log('Last name is empty.');
   toast.warning("Blood Group required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 if (!hospital_id) {
    
   console.log('Last name is empty.');
   toast.warning("Hospital Field required", {
     position: toast.POSITION.TOP_CENTER,
     theme: 'colored',
   });
   return;
 }

 const usernameRegex = /^[a-zA-Z0-9_]+$/;
if (!username || !usernameRegex.test(username)) {
  
 console.log('Invalid username format.');
 toast.warning("Valid username required (alphanumeric characters and underscores only)", {
   position: toast.POSITION.TOP_CENTER,
   theme: 'colored',
 });
 return;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!password || !passwordRegex.test(password)) {
 
 console.log('Invalid password format.');
 toast.warning("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character", {
   position: toast.POSITION.TOP_CENTER,
   theme: 'colored',
 });
 return;
}

if (!image) {
  
 console.log('Image is required.');
 toast.warning("Image required", {
   position: toast.POSITION.TOP_CENTER,
   theme: 'colored',
 });
 return;
}

  try {
    const response = await fetch(`http://127.0.0.1:8000/username_check/${username}`);
    const data = await response.json();

    if (response.status === 200) {
      console.log('Username is already taken.');
      toast.warning("Username is already taken.", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      return false; // Return true when the username is available
    } else if (response.status === 404) {
      console.log('Username is available.');
      return true; // Return false when the username is not available
    } else {
      console.log('Error checking username availability.');
      console.log(response);
      toast.error("Error checking username availability.", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      return false;
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    console.log('Error checking username availability.');
    toast.error("Error checking username availability....", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    });
    return false;
  }
};
const formData = new FormData();
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('HandleSubmit called');

  // Perform username check
  const isUsernameAvailable = await checkUsernameAvailability();

  if (isUsernameAvailable) {
    // Continue with form submission
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('dob', dob);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    formData.append('gender', gender);
    formData.append('joining_date', getDate());
    formData.append('addressline1', addressline1);
    formData.append('blood_grp', blood_grp);
    formData.append('hospital_id', hospital_id);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('consultaion_id', '2312344');
    formData.append('image', image);
  
    console.log(JSON.stringify(formData, null, 2));
    console.log('Joining Date' + joining_date);

    try {
      // Submit the form data
      await axios.post('http://127.0.0.1:8000/api/add_patient/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to the login page.
      toast.success('Patient Added Successfully', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      navigate('/login'); // Redirect to the success page
      console.log('Patient Added Successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error.
      console.log('Patient Not Added Successfully');
    }
  }
};

  return (
   <div className='reg_form'> 
     <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{width:880, height:800,marginTop:5,marginLeft:330,  opacity:1.0}}>
               <div className='form_reg' style={{padding:50}}>
                <h2 style={{fontWeight:'bold', marginTop:-45, fontFamily: 'century',}}>ADD PATIENT DETAILS</h2>
                    <form onSubmit={handleSubmit}>  
                        <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>
                            <div className='col-md-6' style={{ padding:5}}>
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>FIRST NAME</label>
                                    <input type="text" className='form-control' name="first_name" value={formData.first_name} onChange={(e) => setFirst_name(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>LAST NAME</label>
                                    <input type="text" className='form-control' name="last_name"  value={formData.last_name} onChange={(e) => setLast_name(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>DOB</label>
                                    <input type="date" className='form-control' name="dob"  value={formData.last_name} onChange={(e) => setDob(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>EMAIL</label>
                                    <input type="mail" className='form-control' name="email"  value={formData.email}  onChange={(e) => setEmail(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>PHONE NUMBER</label>
                                    <input type="text" className='form-control' name="phonenumber" value={formData.phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>GENDER</label>
                        
                                    <select className='form-control' name="gender"  value={formData.gender}  onChange={(e) => setGender(e.target.value)} >
                                      <option >---Gender ---</option>
                                      <option value='Male'>Male</option>
                                      <option value='Female'>Female</option>
                                      <option value='Others'>Others</option>
                                    </select>
                                
                                </div>
                              </div>
                              


                              {/* <div className='col-md-6' style={{ padding:5}}>
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-225,marginBottom:10,fontWeight:'bold'}}>JOINING DATE</label>
                                    <input type="date" className='form-control' name="joining_date"  value={formData.joining_date} onChange={(e) => setJoining_date(e.target.value)} required/>
                                </div>
                              </div>  */}
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>ADDRESSLINE</label>
                                    <input type="text" className='form-control' name="addressline1"  value={formData.addressline1}  onChange={(e) => setAddressline1(e.target.value)}  />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>BLOOD GROP</label>
                                    <input type="text" className='form-control' name="blood_grp"  value={formData.blood_grp} onChange={(e) => setBlood_grp(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>HOSPITAL ID</label>
                                    <input type="text" className='form-control' name="hospital_id"  value={formData.hospital_id}  onChange={(e) => setHospital_id(e.target.value)} />
                                </div>
                              </div>

                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>USERNAME</label>
                                    <input type="text" className='form-control' name="username"  value={formData.username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>PASSWORD</label>
                                    <input type="password" className='form-control' name="password"  value={formData.password}  onChange={(e) => setPassword(e.target.value)}  />
                                </div>
                              </div>
                              <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginBottom:10,fontWeight:'bold'}}>PATIENT PIC</label>
                               <input
                                    type="file"
                                    accept="image/*" className='form-control' 
                                    onChange={(e) => setImage(e.target.files[0])}
                                  />


                            </div>
                          </div>
                        </div>
                        <button type ='submit' className='btn btn-primary' style={{marginTop:15, marginLeft:320}}>Submit</button>
                    </form>
                 <p style={{marginTop:10, marginLeft:420, fontFamily:"century", fontWeight:"bold"}}>Already Have An Account! <Link to="/login">Login Here</Link></p>
               </div>
            </div>

            <div className='ripple-background'>
              <div class='circle xxlarge shade1'></div>
              <div class='circle xlarge shade2'></div>
              <div class='circle large shade3'></div>
              <div class='circle mediun shade4'></div>
              <div class='circle small shade5'></div>
            </div>


          </div>      

  );
}
export default Reg;
