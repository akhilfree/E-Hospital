import React , {useState, useEffect,} from 'react';
import InsideNavbar from './InsideNavbar';
import axios from 'axios';

import Edit from './images/logo/edit.png';
import { Link, useNavigate } from 'react-router-dom';
import Cross from './images/logo/cross.jpg';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InsideNavbar1 from './InsideNavbar1';

function PatientDetails(){
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
        .get('http://127.0.0.1:8000/api/add_patient/')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const PatientDelete=((id)=>{

        if(window.confirm("Do you want to remove?")){
            fetch('http://127.0.0.1:8000/patient_delete/' +id, 
            {method: 'DELETE'}).then(()=>{

                window.location.reload();

            }).catch((err)=>{
                console.log(err.message)
            })
        }
    })


    const [up, setUp] = useState({
        id: '',
        first_name: '',
        last_name: '',
        dob: '',
        email: '',
        phonenumber: '',
        gender: '',
        joining_date: '',
        addressline1: '',
        blood_grp: '',
        hospital_id: '',
        username: '',
        password: '',
        image: '',
      });


    const Patientupdate=((id)=>{
        console.log(id)
        fetch(`http://127.0.0.1:8000/patient_update/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setUp(res))


    }

    )



   const handlePatientNameChange = (event) => {
    const updatedPatientName = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, first_name: updatedPatientName });
  };
  const lastName = (event) => {
    const updatedlastName = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, last_name: updatedlastName  });
  };
  const HandleDob = (event) => {
    const updatedPatientDob = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, dob: updatedPatientDob  });
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
    setUp({ ...up, addressline1: updatedDoctorAdd  });
  };

  const handleBloodChange = (event) => {
    const updatedDoctorSpec = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, blood_grp: updatedDoctorSpec  });
  };

  const handleHosChange = (event) => {
    const updatedHosChange = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, hospital_id: updatedHosChange  });
  };

  const handleUsername = (event) => {
    const updatedDoctorExp = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, username: updatedDoctorExp  });
  };

  const handlePassword = (event) => {
    const updatedDoctorAva = event.target.value;

    // Update the state with the new doctor_name value
    setUp({ ...up, password: updatedDoctorAva  });
  };

  const [image, setImage] = useState(null);
  // const handlePicChange = (event) => {
  //   const image = event.target.files[0];
  //   setImage(image);
  //   console.log('Image File is ' + image.type)
  // };
  // const up = new up();
  //   up.append('image', image);
 
    //Update code





  



    


    const handleSubmit = async (event, id) => {
      event.preventDefault(); // Prevent the default form submission behavior
    
      try {
        // Create a request object with the data to send to your API
        const requestData = {
            id: up.id,
            first_name: up.first_name,
            last_name:up.last_name,
            dob:up.dob,
            email:up.email,
            phonenumber:up.phonenumber,
            gender:up.gender,
            joining_date:up.joining_date,
            addressline1:up.addressline1,
            blood_grp:up.blood_grp,
            hospital_id:up.hospital_id,
            username:up.username,
            password:up.password,
            image:up.image,
        };
        console.log(JSON.stringify(requestData, null, 2));
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
            <InsideNavbar1 />
            <div className="container" style={{marginTop: 20, }}>
                <div className="row" style={{padding: 100,}}>
            
                        <table className='table  table-hover table-bordered shadow p-3 mb-5 bg-body-tertiary rounded'  style={{width:1100,fontFamily: 'century',}}>
                            <thead style={{fontSize:22}}>
                                <tr>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Mail Id</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Contact No</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Registration Date</th>
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
                                        {item.first_name} &nbsp; {item.last_name}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.joining_date}</td>
                                        {item.status === '0' ? (
                                        <td style={{color: 'red', fontWeight: 'bold'}}>No Active</td>
                                        ): (
                                            <td style={{color: 'green', fontWeight: 'bold'}}>Active</td>
                                    )}
                                    {/* Add more table cells here */}
                                    <td>
                                        {/* <Link to={`/doctor_updates/${item.id}`}><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></Link>&emsp; */}
                                        <a href='#' onClick={()=>{Patientupdate(item.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></a>&emsp;
                                        <a href='#' onClick={()=>{PatientDelete(item.id)}}><img src={Cross} alt='dgfhdg' style={{width:20, height:20,}} /></a>
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
                <h2 style={{color:'black', fontWeight:'bold'}}>Update Patient Details</h2>
                <form onSubmit={(e) => handleSubmit(e, up.id)} encType="multipart/form-data" >
                  <div className='row' style={{border: '2px solid lightgrey', padding:20, fontFamily:'fangsong',}}>
                  <div className='col-md-6' style={{ padding:5}}>
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>FIRST NAME</label>
                                    <input type="text" className='form-control' name="first_name" value={up.first_name} onChange={handlePatientNameChange} />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-235,marginBottom:10,fontWeight:'bold'}}>LAST NAME</label>
                                    <input type="text" className='form-control' name="last_name"  value={up.last_name} onChange={lastName} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-235,marginBottom:10,fontWeight:'bold'}}>DOB</label>
                                    <input type="date" className='form-control' name="dob"  value={up.dob} onChange={HandleDob} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-270,marginBottom:10,fontWeight:'bold'}}>EMAIL</label>
                                    <input type="mail" className='form-control' name="email"  value={up.email}  onChange={handleMailChange} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-205,marginBottom:10,fontWeight:'bold'}}>PHONE NUMBER</label>
                                    <input type="text" className='form-control' name="phonenumber" value={up.phonenumber} onChange={handleMobChange} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-255,marginBottom:10,fontWeight:'bold'}}>GENDER</label>
                                    <input type="text" className='form-control' name="gender"  value={up.gender}  onChange={handleGenderChange} required/>
                                </div>
                              </div>
                              


                              {/* <div className='col-md-6' style={{ padding:5}}>
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-225,marginBottom:10,fontWeight:'bold'}}>JOINING DATE</label>
                                    <input type="date" className='form-control' name="joining_date"  value={up.joining_date} onChange={(e) => setJoining_date(e.target.value)} required/>
                                </div>
                              </div> */}
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-220,marginBottom:10,fontWeight:'bold'}}>ADDRESSLINE</label>
                                    <input type="text" className='form-control' name="addressline1"  value={up.addressline1}  onChange={handleAddChange} required />
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-195,marginBottom:10,fontWeight:'bold'}}>BLOOD GROP</label>
                                    <input type="text" className='form-control' name="blood_grp"  value={up.blood_grp} onChange={handleBloodChange} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-230,marginBottom:10,fontWeight:'bold'}}>HOSPITAL ID</label>
                                    <input type="text" className='form-control' name="hospital_id"  value={up.hospital_id}  onChange={handleHosChange} required/>
                                </div>
                              </div>

                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-235,marginBottom:10,fontWeight:'bold'}}>USERNAME</label>
                                    <input type="text" className='form-control' name="username"  value={up.username} onChange={handleUsername} required/>
                                </div>
                              </div>
                              <div className='col-md-6'>  
                                <div className='form-group' style={{marginTop:5}}>
                                    <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>PASSWORD</label>
                                    <input type="password" className='form-control' name="password"  value={up.password}  onChange={handlePassword} required />
                                </div>
                              </div>
                              <div className='col-md-6' style={{ padding:5}}>
                            <div className='form-group' style={{marginTop:5}}>
                               <label style={{marginLeft:-245,marginBottom:10,fontWeight:'bold'}}>PATIENT PIC</label>
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
  
  export default PatientDetails;