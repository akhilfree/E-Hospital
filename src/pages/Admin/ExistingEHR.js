import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './images/logo/edit.png';
import Edit2 from './images/logo/edit2.png';
import Edit3 from './images/logo/edit3.png';
import InsideNavbar1 from "./InsideNavbar1";


function ExistingEHR(){

    const[nameList, setNameList] = useState([]);
    const[search, setSearch] = useState("")

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/add_patient?limit=500')
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
        fetch(`http://127.0.0.1:8000/patient_update/${id}`)
        .then(resposne=> resposne.json())
        .then(res=>setUp(res))
        
    }

    )


  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState(null);
  const[username, setUsername] = useState('');
  const [scan_date, setScan_date] = useState('');
  const [procedure_Details, setProcedure_Details] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [scan_image, setScan_image] = useState(null);
  
  const [report_date, setReport_date] = useState(null);
  const [result_Details, setResult_Details] = useState(null);
  const [conclusion, setCon] = useState(null);
  const [report_image, setReport_image] = useState(null);



  //Medical 

  const [primary_diagnosis, setPrimary_diagnosis] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const [medication_name, setMedication_name] = useState(null);
  const [Dosage, setDosage] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [reason_prescription, setReason_prescription] = useState(null);
  const [prescribing_doctor, setPrescribing_doctor] = useState(null);
  const [prescription_image, setPrescription_image] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('patient_id', up.id);
    formData.append('first_name', up.first_name);
    formData.append('last_name', up.last_name);
    formData.append('scan_date', scan_date);
    formData.append('procedure_Details', procedure_Details);
    formData.append('desc', desc);
    formData.append('type', 'Scan Report');
    formData.append('scan_image', scan_image);
    formData.append('username', up.username);
    console.log(JSON.stringify(formData, null, 2));
    try {
      await axios.post('http://127.0.0.1:8000/api/add_ehr/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to student list page.
      toast.success("Record Inserted Successful", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 5000); // 5000 milliseconds (2 seconds)
   
      console.log('Scan Report Added Successfully')
    } catch (error) {
      // Handle error.
      console.log('Scan Report Not Added Successfully')
    }
  };

  //Lab report Submission

  const reportSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('patient_id', up.id);
    formData.append('first_name', up.first_name);
    formData.append('last_name', up.last_name);
    formData.append('report_date', report_date);
    formData.append('result_Details', result_Details);
    formData.append('conclusion', conclusion);
    formData.append('type', 'Lab Report');
    formData.append('report_image', report_image);
    formData.append('username', up.username);
    console.log(JSON.stringify(formData, null, 2));
    try {
      await axios.post('http://127.0.0.1:8000/api/lab_ehr/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to student list page.
      toast.success("Report Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 5000); // 5000 milliseconds (2 seconds)
   
      console.log('Record Inserted Successfully')
    } catch (error) {
      // Handle error.
    }
  };

  //Medication Submission


  const medSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('patient_id', up.id);
    formData.append('first_name', up.first_name);
    formData.append('last_name', up.last_name);
    formData.append('primary_diagnosis', primary_diagnosis);
    formData.append('allergies', allergies);
    formData.append('medication_name', medication_name);
    formData.append('Dosage', Dosage);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);
    formData.append('reason_prescription', reason_prescription);
    formData.append('prescribing_doctor', prescribing_doctor);
    formData.append('prescription_image', prescription_image);
    formData.append('username', up.username);
    console.log(JSON.stringify(formData, null, 2));
    try {
      await axios.post('http://127.0.0.1:8000/api/medical_ehr/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success or navigate to student list page.
      toast.success("Medication History Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => {
        window.location.reload(false);
      }, 5000); // 5000 milliseconds (2 seconds)
   
      console.log('Record Inserted Successfully')
    } catch (error) {
        console.log(error)
      // Handle error.
    }
  };


    return(
        <div className="Ehr">
            <InsideNavbar1 />
            <div className="container" style={{marginTop: 20,marginLeft:100 }}>
                <h3 style={{padding:20}}><b>PREVIOUS HEALTH RECORDS</b></h3>
                <div className="row shadow " style={{padding:20,width:1200, backgroundColor: 'white'}}>
                    <div className='search' style={{padding:20, marginLeft:80}}>
                        <div className='row'>
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'style={{width:'30%'}}>
                                <input type='text' className='form-control' placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table className='table  table-hover  '  style={{fontFamily: 'century',}}>
                            <thead style={{fontSize:12}}>
                                <tr>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Patient Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Contact No</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Registered Date</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Scanning Report</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Lab Report</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Medication Report</th>
                                
                                {/* Add more table headers here */}
                                </tr>
                            </thead>
                            <tbody>
                                {nameList.filter((item)=>{
                                    if(search===""){
                                        return item
                                    }
                                    else if(item.id.toString().includes(search.toLowerCase())){
                                        return item
                                    }
                                    
                                })
                                .map((item)=>{
                                    return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td style={{textAlign:'left', paddingLeft: 20}}>
                                    <img src={item.image} class="img-rounded" alt={item.first_name} style={{width:50, height:50}}/>&emsp;
                                        {item.first_name} &nbsp;{item.last_name}
                                    </td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.joining_date}</td>
                                        
                                    {/* Add more table cells here */}
                                    <td>
                                    <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{Patientscan(item.id)}}><img src={Edit} alt='dgfhdg' style={{width:25, height:25,}} /></a>&emsp;
                                    </td>
                                    <td>
                                    <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{Patientscan(item.id)}}><img src={Edit2} alt='dgfhdg' style={{width:20, height:20,}} /></a>
                                    </td>
                                    <td>
                                    <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={()=>{Patientscan(item.id)}}><img src={Edit3} alt='dgfhdg' style={{width:20, height:20,}} /></a>
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel" style={{fontWeight:'bold'}}>Previous Scanning Report of {up.first_name}&nbsp;{up.last_name}</h1>
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
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>First Name</label>
                                                <input type='text'  value={up.first_name} onChange={(e) => setFirst_name(e.target.value)} className='form-control'readOnly required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Last Name</label>
                                                <input type='text'  value={up.last_name} className='form-control' onChange={(e) => setLast_name(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Username</label>
                                                <input type='text'  value={up.username} className='form-control' onChange={(e) => setUsername(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -140, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Scanning Taken</label>
                                                <input type='date' value={scan_date} className='form-control' onChange={(e) => setScan_date(e.target.value)}   required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -130, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Procedure Details</label>
                                                <input type='text' value={procedure_Details}  className='form-control' onChange={(e) => setProcedure_Details(e.target.value)} required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Scan Image</label>
                                                <input type='file' accept="image/*" className='form-control' required onChange={(e) => setScan_image(e.target.files[0])} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Description</label>
                                                <textarea type='text' name='scan_desc' className='form-control' required onChange={(e) => setDesc(e.target.value)} />
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



                {/* Lab History */}

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel" style={{fontWeight:'bold'}}>Previous Lab Report of {up.first_name}&nbsp;{up.last_name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div className='container'style={{padding: 50}}>
                            <form onSubmit={reportSubmit}> 
                               <div className='inner_div' style={{border: '1px solid lightgrey',}}>
                                    <div className='row'style={{padding:40,}}>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>First Name</label>
                                                <input type='text'  value={up.first_name} onChange={(e) => setFirst_name(e.target.value)} className='form-control'readOnly required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Last Name</label>
                                                <input type='text'  value={up.last_name} className='form-control' onChange={(e) => setLast_name(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Username</label>
                                                <input type='text'  value={up.username} className='form-control' onChange={(e) => setUsername(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -140, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Report Date</label>
                                                <input type='date' value={report_date} className='form-control' onChange={(e) => setReport_date(e.target.value)}   required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -130, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Lab Result Details</label>
                                                <input type='text' value={result_Details}  className='form-control' onChange={(e) => setResult_Details(e.target.value)} required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Report Image</label>
                                                <input type='file' accept="image/*" className='form-control' required onChange={(e) => setReport_image(e.target.files[0])} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Conclusion</label>
                                                <textarea type='text' name='conclusion' className='form-control' required onChange={(e) => setCon(e.target.value)} />
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
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>



            {/* Medication History */}

            <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"style={{fontWeight:'bold'}}>Previous Medical Report of {up.first_name}&nbsp;{up.last_name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div className='container'style={{padding: 50}}>
                            <form onSubmit={medSubmit}> 
                               <div className='inner_div' style={{border: '1px solid lightgrey',}}>
                                    <div className='row'style={{padding:40,}}>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>First Name</label>
                                                <input type='text'  value={up.first_name} onChange={(e) => setFirst_name(e.target.value)} className='form-control'readOnly required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Last Name</label>
                                                <input type='text'  value={up.last_name} className='form-control' onChange={(e) => setLast_name(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Username</label>
                                                <input type='text'  value={up.username} className='form-control' onChange={(e) => setUsername(e.target.value)} readOnly required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -140, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Medical Conditions</label>
                                                <input type='text' value={primary_diagnosis} className='form-control' onChange={(e) => setPrimary_diagnosis(e.target.value)}   required />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -130, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Allergies</label>
                                                <input type='text' value={allergies}  className='form-control' onChange={(e) => setAllergies(e.target.value)} required />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Medication Name</label>
                                                <textarea type='text' name='medication_name' className='form-control' required onChange={(e) => setMedication_name(e.target.value)} />
                                            </div>
                                        </div>  <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Dosage</label>
                                                <textarea type='text' name='Dosage' className='form-control' required onChange={(e) => setDosage(e.target.value)} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Start Date</label>
                                                <input type='date' name='start_date' className='form-control' required onChange={(e) => setStart_date(e.target.value)} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>End Date</label>
                                                <input type='date' name='end_date' className='form-control' required onChange={(e) => setEnd_date(e.target.value)} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Reason Prescription</label>
                                                <textarea type='text' name='reason_prescription' className='form-control' required onChange={(e) => setReason_prescription(e.target.value)} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -190, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Prescribing Doctor</label>
                                                <textarea type='text' name='prescribing_doctor' className='form-control' required onChange={(e) => setPrescribing_doctor(e.target.value)} />
                                            </div>
                                        </div> 
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label style={{marginLeft: -160, fontWeight:'bold', fontSize:15,fontFamily: 'century'}}>Report Image</label>
                                                <input type='file' accept="image/*" className='form-control' required onChange={(e) => setPrescription_image(e.target.files[0])} />
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
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>





            
        </div>
    );
}

export default ExistingEHR;