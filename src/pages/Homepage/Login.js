import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link, useNavigate} from 'react-router-dom';
import './styles/css/reg.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Reg({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password)


    
    if (!username) {
      // Display an error message or take appropriate action
      console.log('Last name is empty.');
      toast.warning("Username Required", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      return;
    }
  
    if (!password) {
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
      const response = await fetch('http://127.0.0.1:8000/api/patient_login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)
      if (response.ok) {
        toast.success("You Logged in as " +username, {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        navigate(`/user`, { state: { username } }); // Redirect to success page
        // Successful login
        // You can redirect the user or store authentication tokens
        console.log('Login successful');
      } else {
         toast.error("Invalid Credntials!", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        navigate('/login'); // Redirect to success page
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
     <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{width:580, height:450,marginTop:60,marginLeft:450, backgroundColor:'white'}}>
               <div className='form_reg' style={{padding:50}}>
                <h2 style={{fontWeight:'bold', marginTop:-25, fontFamily: 'fangsong',}}>LOGIN HERE</h2>
                    <form onSubmit={handleSubmit}>  
                        <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>

                               
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>USERNAME</label>
                                    <input type="text" className='form-control' name="username"  value={username} onChange={handleUsernameChange}/>
                                </div>
                              
                              
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginBottom:10,fontWeight:'bold'}}>PASSWORD</label>
                                    <input type="password" className='form-control' name="password" value={password} onChange={handlePasswordChange} />
                                </div>
                              










                        </div>
                        <button type ='submit' className='btn btn-primary' style={{marginTop:15,marginLeft: 180}}>Submit</button>
                    </form>
                 <p style={{marginTop:10, marginLeft:200, fontFamily:"sans-serif", fontWeight:"bold"}}>Already Have An Account! <Link to="/register">Register Here</Link></p>
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
