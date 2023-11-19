import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './images/logo/edit.png';
import Edit2 from './images/logo/edit2.png';
import Edit3 from './images/logo/edit3.png';


const Available_doctor =  () => {
    const[nameList, setNameList] = useState([]);
    const[search, setSearch] = useState("")

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/add_doctor/?limit=500')
        .then((response)=>{setNameList(response.data)})
    },[])

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const[currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)


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


      const DoctorUpdate=(id)=>{
        navigate('/upload_ehr/'+id); 

    }

    // Scan

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


    const Patientscan=((id)=>{
        console.log(id)
        fetch(`http://127.0.0.1:8000/doctor_update/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setUp(res))
        
    }

    )


  const [doctor_name, setDoctor_name] = useState('');
  const [specialization, setSpecialization] = useState(null);
  const [consultation_from, setConsultation_from] = useState('');
  const [consultation_to, setConsultation_to] = useState('');
  const [consultation_time, setConsultation_time] = useState('');
  const [patient_days, setPatient_days] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('doctor_name', up.doctor_name);
    formData.append('specilaization', up.specilaization);
    formData.append('consultation_from', consultation_from);
    formData.append('consultation_to', consultation_to);
    formData.append('consultation_time', consultation_time);
    formData.append('patient_days', patient_days);
    formData.append('total_patient', '0');
    formData.append('month_total', '0');
    formData.append('consult_fee', '200');

    console.log(JSON.stringify(formData, null, 2));
    try {
      await axios.post('http://127.0.0.1:8000/doctor_schedule/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to student list page.
      toast.success("Record Inserted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 5000); // 5000 milliseconds (2 seconds)
   
      console.log('Scan Report Added Successfully')
    } catch (error) {
      // Handle error.
    }
  };
    return(
        <div className="Ehr">
            
            <div className="container" style={{marginTop: 20,marginLeft:100 }}>
                <h3 style={{padding:20}}><b>SCHEDULE DOCTOR CONSULATION</b></h3>
                <div className="row shadow " style={{padding:20,width:1200, backgroundColor: 'white'}}>
                    <div className='search' style={{padding:20, marginLeft:80}}>
                        <div className='row'>
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'style={{width:'30%'}}>
                                <select className='form-control' placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)} >
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
                    <div class="table-responsive">
                        <table className='table  table-hover  '  style={{fontFamily: 'century',}}>
                            <thead style={{fontSize:12}}>
                                <tr>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Doctor Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Mail Id</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Specialization</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Schedule</th>

                                
                                {/* Add more table headers here */}
                                </tr>
                            </thead>
                            <tbody>
                                {nameList.filter((item)=>{
                                    if(search===""){
                                        return item
                                    }
                                    else if(item.specilaization.toLowerCase().includes(search.toLowerCase())){
                                        return item
                                    }
                                    
                                })
                                .map((item)=>{
                                    return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td style={{textAlign:'left', paddingLeft: 20, fontWeight:'bold'}}>
                                    <img src={item.image} class="img-rounded" alt={item.doctor_name} style={{width:50, height:50}}/>&emsp;
                                        {item.doctor_name} 
                                    </td>
                                    <td style={{fontWeight:'bold'}}>{item.email}</td>
                                    <td style={{fontWeight:'bold'}}>{item.specilaization}</td>
                                        
                                    {/* Add more table cells here */}
                                    <td>
                                    <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{Patientscan(item.id)}}><img src={Edit} alt='dgfhdg' style={{width:25, height:25,}} /></a>&emsp;
                                    </td>
                                </tr>
                                    )
                              
                            })
                            }
                            </tbody>
                        </table>

                    </div>        
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



            {/* Scanning History */}

            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel" style={{fontWeight:'bold'}}>Consulation Timing for {up.doctor_name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {/* Form for Taking input from user */}
                        <div className='container'style={{padding: 50}}>
                            <form onSubmit={handleSubmit}> 
                               <div className='inner_div' style={{border: '1px solid lightgrey',}}>
                                    <div className='row'style={{padding:40,}}>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Doctor Name</label>
                                                <input type='text'  value={up.doctor_name} onChange={(e) => setDoctor_name(e.target.value)} className='form-control'readOnly required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Specialization</label>
                                                <input type='text'  value={up.specilaization} className='form-control' onChange={(e) => setSpecialization(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -130, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Consultation From</label>
                                                <select  name='consultation_from' className='form-control' onChange={(e) => setConsultation_from(e.target.value)}   required>
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                    <option value="Friday">Friday</option>
                                                    <option value="Saturday">Saturday</option>
                                                    <option value="Sunday">Sunday</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -150, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Consultation To</label>
                                                <select  name='consultation_to'  className='form-control' onChange={(e) => setConsultation_to(e.target.value)} required>
                                                    <option value="Monday">Monday</option>
                                                    <option value="Tuesday">Tuesday</option>
                                                    <option value="Wednesday">Wednesday</option>
                                                    <option value="Thursday">Thursday</option>
                                                    <option value="Friday">Friday</option>
                                                    <option value="Saturday">Saturday</option>
                                                    <option value="Sunday">Sunday</option>
                                                </select>
                                            </div>
                                        </div> 
                                        
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -150, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Consulation Time</label>
                                                <input type='text' name='consultation_time' className='form-control' required onChange={(e) => setConsultation_time(e.target.value)} />
                                            </div>
                                        </div>  
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Patients Per Day</label>
                                                <input type='text' name='patient_days' className='form-control' required onChange={(e) => setPatient_days(e.target.value)} />
                                            </div>
                                        </div>  
                                    </div>
                                    <button type='submit' className='btn btn-success'style={{marginBottom:20}}>Save Details</button>
                                </div>    
                            </form>         
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Available_doctor;