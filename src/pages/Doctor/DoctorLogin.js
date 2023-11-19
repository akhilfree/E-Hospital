import React, { useState } from 'react';




import {  useNavigate} from 'react-router-dom';
import '../Admin/styles/css/reg.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function DoctorLogin({ onLogin }) {
  
  const navigate = useNavigate();
  const [doctor_name, setUsername] = useState('');
  const [email, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(doctor_name, email)


    
    if (!doctor_name) {
      // Display an error message or take appropriate action
      console.log('Last name is empty.');
      toast.warning("Username Required", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      return;
    }
  
    if (!email) {
      // Display an error message or take appropriate action
      console.log('Last name is empty.');
      toast.warning("Password Required", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      return;
    }

    try {
      // Make an API request to validate user credentials
      const response = await fetch('http://127.0.0.1:8000/api/doctor_login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor_name, email }),
      });
      console.log(response)
      if (response.ok) {
        toast.success("You Logged in as " +doctor_name, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        navigate('/doctor', { state: { doctor_name } }); // Redirect to success page
        // Successful login
        // You can redirect the user or store authentication tokens
        console.log('Login successful');
      } else {
         toast.error("Invalid Credntials!", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        navigate('/doctor_login'); // Redirect to success page
        console.log('Inavlid Crendials!')
        setTimeout(() => {
          window.location.reload(false);
        }, 5000); // 5000 milliseconds (2 seconds)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
   <div className='reg_form'> 
     <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{width:580, height:420,marginTop:60,marginLeft:450, backgroundColor:'white',}}>
               <div className='form_reg' style={{padding:50}}>
                <h2 style={{fontWeight:'bold', marginTop:-25, fontFamily: 'fangsong',}}>DOCTOR LOGIN</h2>
                    <form onSubmit={handleSubmit}>  
                        <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>

                               
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>USERNAME</label>
                                    <input type="text" className='form-control' name="doctor_name"  value={doctor_name} onChange={handleUsernameChange}/>
                                </div>
                              
                              
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>PASSWORD</label>
                                    <input type="password" className='form-control' name="email" value={email} onChange={handlePasswordChange} />
                                </div>   
                        </div>
                        <button type ='submit' className='btn btn-primary' style={{marginTop:15}}>Submit</button>
                    </form>
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

export default DoctorLogin;
