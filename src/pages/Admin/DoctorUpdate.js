import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams , useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function DoctorUpdate(){
    const[data, setData] = useState('')
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/task-update/' +id)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    },[])


    const [image, setImage] = useState(null);


    //Update Code
    const [datas, setDatas] = useState({
      id: id,
      doctor_name: '', // Initial value
      dob: '',
      gender: '',
      email: '',
      phonenumber: '', 
      address: '', 
      specilaization: '', 
      license_expiry_date: '',
      years_of_exp: '', 
      availability: '', 
      image: null, 
      status: '0', 
    });
    
    const handleDoctorNameChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, doctor_name: newValue  });
    };

    const handleDobChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, dob: newValue  });
    };
    
    
    const handleGenderChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, gender: newValue  });
    };
    const handleMailChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, mail: newValue  });
    };
    const handleMobChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, phonenumber: newValue  });
    };
    const handleAddChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, address: newValue  });
    };

    const handleSpecChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, specilaization: newValue  });
    };
    const handleLicChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, license_expiry_date: newValue  });
    };
    const handleExpChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, years_of_exp: newValue  });
    };
    const handleAvaChange = (event) => {
      const newValue = event.target.value;
      console.log(newValue)
      setData({ ...data, availability: newValue  });
    };

    const handlePicChange = (event) => {
      const image = event.target.files[0];
      setImage(image);
      console.log('Image File is ' + image.type)
    };
    const formData = new FormData();
      formData.append('image', image);
   
      //Update code

      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        try {
          // Create a request object with the data to send to your API
          const requestData = {
            id: data.id,
            doctor_name: data.doctor_name,
            dob: data.dob,
            gender: data.gender,
            email: data.email,
            phonenumber: data.phonenumber,
            address: data.address,
            specilaization: data.specilaization,
            license_expiry_date: data.license_expiry_date,
            years_of_exp: data.years_of_exp,
            availability: data.availability,
            image: image,
            status: '0',
          };
          console.log(requestData);
          // Send the requestData to your API
          await axios.put('http://127.0.0.1:8000/task-update/'+id, requestData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
        
      });

      // Handle success or navigate to student list page.
      toast.success("Doctor Inserted Successful", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      console.log('Student Inserted Successfully')
      
    } catch (error) {
      console.error('Error Message is created:', error);
    }
      };
    
    return(
        <div className="DoctorUpdate">
            
            <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{width:880, height:840,marginTop:10,marginLeft:330, backgroundColor:'white',}}>
             <div className='form_reg' style={{padding:15}}>
                <h2 style={{color:'black', fontWeight:'bold'}}>Update Doctor Details</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                  <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>
                        <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR NAME</label>
                              <input type="text" value={data.doctor_name} placeholder="Doctor Name" onChange={handleDoctorNameChange} className='form-control' />
                            </div>
                          </div>  
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DATE OF BRITH</label>
                               <input
                                  type="date"
                                  placeholder="Dob" className='form-control'
                                  value={data.dob} onChange={handleDobChange}
                                  

                                />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>GENDER</label>
                               <input 
                          type="text"  value={data.gender} className="form-control" 
                    
                          placeholder="Gender" required onChange={handleGenderChange}

                        />
                            </div>
                          </div>


                      
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>MAIL ID</label>
                               <input
                          type="mail" value={data.email}
                          placeholder="Email" className='form-control' onChange={handleMailChange}
                    

                        />
                            </div>
                          </div>




                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>MOB NO</label>
                               <input
                          type="text" value={data.phonenumber}
                          placeholder="Phone Number" className='form-control' onChange={handleMobChange}
                      

                        />

                            </div>
                          </div>
                          
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>ADDRESSLINE</label>
                               <input
                                  type="text" value={data.address}
                                  placeholder="Address" className='form-control' onChange={handleAddChange}
                          
                                />
                            </div>
                          </div>
                        

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>SPECIALIZATION</label>
                               <input
                                  type="text" value={data.specilaization}
                                  placeholder="Specilaization" className='form-control' onChange={handleSpecChange}
                             
                                />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-195,marginBottom:10,fontWeight:'bold'}}>LICENSE EXPIRY DATE</label>
                               <input
                                  type="date"  value={data.license_expiry_date}
                                  placeholder="license_expiry_date" className='form-control' onChange={handleLicChange}
                       
                                />
                            </div>
                          </div>
                        
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>EXPERIENCE</label>
                               <input
                                    type="text" value={data.years_of_exp}
                                    placeholder="Years Of Experience" className='form-control' onChange={handleExpChange}
                                  
                                  />
                            </div>
                          </div>


                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>AVALILABILTY</label>
                               <input
                                  type="text" value={data.availability}
                                  placeholder="Availability" className='form-control' required onChange={handleAvaChange}
                               
                                  
                                />

                            </div>
                          </div>
                          
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR PIC</label>
                               <img src={data.image} alt="Current" style={{marginBottom: 20, width:70}} />
                               <input
                                    type="file" 
                                    accept="image/*" className='form-control' required onChange={handlePicChange}
                                    
                                    
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
export default DoctorUpdate;