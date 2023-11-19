import React , {useState, useEffect,} from 'react';
import InsideNavbar from './InsideNavbar';
import axios from 'axios';

import Edit from './images/logo/edit.png';
import { Link, useNavigate } from 'react-router-dom';
import Cross from './images/logo/cross.jpg';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoctorStatus(){
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    const[currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)


    // const DoctorUpdate=(id)=>{
    //     navigate('/doctor_updates/'+id); 

    // }
  
    useEffect(() => {
      // Fetch data from an API or another data source
      axios
        .get('http://127.0.0.1:8000/add_doctor/')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const DocDelete=((id)=>{

        if(window.confirm("Do you want to remove?")){
            fetch('http://127.0.0.1:8000/doctor_delete/' +id, 
            {method: 'DELETE'}).then(()=>{

                window.location.reload();

            }).catch((err)=>{
                console.log(err.message)
            })
        }
    })


    const [up, setUp] = useState({
        id: '',
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


    const Docupdate=((id)=>{
        console.log(id)
        fetch(`http://127.0.0.1:8000/task-update/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setUp(res))


    }

    )



   const handleDoctorNameChange = (event) => {
    const updatedDoctorName = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, doctor_name: updatedDoctorName });
  };

  const handleDobChange = (event) => {
    const updatedDoctorDob = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, dob: updatedDoctorDob  });
  };
  const handleGenderChange = (event) => {
    const updatedDoctorGender = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, gender: updatedDoctorGender  });
  };
  const handleMailChange = (event) => {
    const updatedDoctorMail = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, email: updatedDoctorMail });
  };
  const handleMobChange = (event) => {
    const updatedDoctorMob = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, phonenumber: updatedDoctorMob  });
  };

  const handleAddChange = (event) => {
    const updatedDoctorAdd = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, address: updatedDoctorAdd  });
  };

  const handleSpecChange = (event) => {
    const updatedDoctorSpec = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, specilaization: updatedDoctorSpec  });
  };

  const handleLicChange = (event) => {
    const updatedDoctorLic = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, license_expiry_date: updatedDoctorLic  });
  };

  const handleExpChange = (event) => {
    const updatedDoctorExp = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, years_of_exp: updatedDoctorExp  });
  };

  const handleAvaChange = (event) => {
    const updatedDoctorAva = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, availability: updatedDoctorAva  });
  };

  const [image, setImage] = useState(null);
  // const handlePicChange = (event) => {
  //   const image = event.target.files[0];
  //   setImage(image);
  //   console.log('Image File is ' + image.type)
  // };
  // const formData = new FormData();
  //   formData.append('image', image);
 
    //Update code





  



    


    const handleSubmit = async (event, id) => {
      event.preventDefault(); // Prevent the default form submission behavior
    
      try {
        // Create a request object with the data to send to your API
        const requestData = {
          id: up.id,
          doctor_name: up.doctor_name,
          dob: up.dob,
          gender: up.gender,
          email: up.email,
          phonenumber: up.phonenumber,
          address: up.address,
          specilaization: up.specilaization,
          license_expiry_date: up.license_expiry_date,
          years_of_exp: up.years_of_exp,
          availability: up.availability,
          image: up.image,
          status: '0',
        };
        console.log('Updated Data'+JSON.stringify(requestData, null, 2));
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
    console.log('Error Data' + error)
    console.error('Error Message is created:', error);
    toast.error("Doctor Not Updated Successfully", {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    });
  }
      };
    
    









  function prePage(){
    if (currentPage !== firstIndex){
        setCurrentPage(currentPage - 1)
    }

  }
  function nextPage(){
    if(currentPage !== lastIndex){
        setCurrentPage(currentPage +1)
    }
    
  }
  function changeCPage(id){
    setCurrentPage(id)
    
  }
    return (
        <div className="area">
            <InsideNavbar />
            <div className="container-fluid" style={{marginTop: 20, }}>
                <div className="row" style={{padding: 100,}}>
            
                        <table className='table  table-hover table-bordered shadow p-3 mb-5 bg-body-tertiary rounded'  style={{width:4000,fontFamily: 'century',}}>
                            <thead style={{fontSize:22}}>
                                <tr>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Mail Id</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Contact No</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Specilaization</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Availability</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Operations</th>
                                {/* Add more table headers here */}
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td style={{textAlign:'left', paddingLeft: 20}}>
                                    <img src={item.image} class="img-rounded" alt={data.doctor_name} style={{width:50, height:50}}/>&emsp;
                                        {item.doctor_name}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.specilaization}</td>
                                        {item.status === '0' ? (
                                        <td style={{color: 'red', fontWeight: 'bold'}}>No Active</td>
                                        ): (
                                            <td style={{color: 'green', fontWeight: 'bold'}}>Active</td>
                                    )}
                                    {/* Add more table cells here */}
                                    <td>
                                        {/* <Link to={`/doctor_updates/${item.id}`}><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></Link>&emsp; */}
                                        <a href='#' onClick={()=>{Docupdate(item.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></a>&emsp;
                                        <a href='#' onClick={()=>{DocDelete(item.id)}}><img src={Cross} alt='dgfhdg' style={{width:20, height:20,}} /></a>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a href='#' className='page-link' onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbers.map((n ,i)=>(
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a href='#'className='page-link'  onClick={()=>changeCPage(n)} >{n}</a>
                                        </li>
                                    ))
                                }

                                    <li className='page-item'>
                                    <a href='#' className='page-link' onClick={nextPage}>Next</a>
                                    </li>

                            </ul>
                        </nav>
                    </div>                 
                </div>                    
                
                


                
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      <div className='container ' style={{width:700, height:760,marginTop:10,marginLeft:30, backgroundColor:'white',}}>
             <div className='form_reg' style={{padding:15}}>
                <h2 style={{color:'black', fontWeight:'bold'}}>Update Doctor Details</h2>
                <form onSubmit={(e) => handleSubmit(e, up.id)} encType="multipart/form-data" >
                  <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>
                        <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR NAME</label>
                              <input type="text" value={up.doctor_name} placeholder="Doctor Name" onChange={handleDoctorNameChange} className='form-control' />
                            </div>
                          </div>  
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DATE OF BRITH</label>
                               <input
                                  type="date"
                                  placeholder="Dob" className='form-control'
                                  value={up.dob} onChange={handleDobChange}
                                />
                            </div>
                          </div>
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>GENDER</label>
                               <input 
                          type="text"  value={up.gender} className="form-control" 
                    
                          placeholder="Gender" required onChange={handleGenderChange}

                        />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>MAIL ID</label>
                               <input
                          type="mail" value={up.email}
                          placeholder="Email" className='form-control' onChange={handleMailChange}
                    

                        />
                            </div>
                          </div>




                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-285,marginBottom:10,fontWeight:'bold'}}>MOB NO</label>
                               <input
                          type="text" value={up.phonenumber}
                          placeholder="Phone Number" className='form-control' onChange={handleMobChange}
                      

                        />

                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>ADDRESSLINE</label>
                               <input
                                  type="text" value={up.address}
                                  placeholder="Address" className='form-control' onChange={handleAddChange}
                          
                                />
                            </div>
                          </div>
                        

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>SPECIALIZATION</label>
                               <input
                                  type="text" value={up.specilaization}
                                  placeholder="Specilaization" className='form-control' onChange={handleSpecChange}
                             
                                />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-195,marginBottom:10,fontWeight:'bold'}}>LICENSE EXPIRY DATE</label>
                               <input
                                  type="date"  value={up.license_expiry_date}
                                  placeholder="license_expiry_date" className='form-control' onChange={handleLicChange}
                       
                                />
                            </div>
                          </div>
                        
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>EXPERIENCE</label>
                               <input
                                    type="text" value={up.years_of_exp}
                                    placeholder="Years Of Experience" className='form-control' onChange={handleExpChange}
                                  
                                  />
                            </div>
                          </div>

                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>AVALILABILTY</label>
                               <input
                                  type="text" value={up.availability}
                                  placeholder="Availability" className='form-control' required onChange={handleAvaChange}
                               
                                  
                                />

                            </div>
                          </div>
                          
                          <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>DOCTOR PIC</label>
                               <img src={up.image} alt="Current" style={{marginBottom: 20, width:70}} />
                               <input
                                    type="file" 
                                    accept="image/*" className='form-control'  onChange={(e) => setImage(e.target.files[0])}
                                    
                                    
                                  />
                                  


                            </div>
                          </div>










                          
                    </div>
                    <button type ='submit' className='btn btn-primary' style={{marginTop:15}}>Submit</button>
                  </form>
        </div>        
      </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>    

      </div> 
    );
  }
  
  export default DoctorStatus;