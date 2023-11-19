import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import './styles/css/UploadEHR.css';

import axios from 'axios';



function UploadEHR(){

  const { id } = useParams();

  // State for patient data
  const [data, setData] = useState({
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

  // State for employee data
  const [emp, setEmp] = useState([]);
  const [lab, setLab] = useState([]);
  const [med, setMed] = useState([]);

  useEffect(() => {
    // Fetch patient data
    axios.get(`http://127.0.0.1:8000/patient_fetch/${id}`)
      .then(res => {
        setData(res.data);
        console.log(JSON.stringify(res.data, null, 2)); // Log the updated data
      })
      .catch(err => console.log(err));

    // Fetch employee data
    axios.get(`http://127.0.0.1:8000/ehr-update/${id}`)
      .then(res => {
        setEmp(res.data);
        console.log(JSON.stringify(res.data, null, 2)); // Log the updated emp
      })
      .catch(err => console.log(err));
      
      axios.get(`http://127.0.0.1:8000/lab-update/${id}`)
      .then(res => {
        setLab(res.data);
        console.log(JSON.stringify(res.data, null, 2)); // Log the updated emp
      })

      axios.get(`http://127.0.0.1:8000/med-update/${id}`)
      .then(res => {
        setMed(res.data);
        console.log(JSON.stringify(res.data, null, 2)); // Log the updated emp
      })

  }, [id]);

  const [up, setUp] = useState({
    id: '',
    patient_id: '',
    first_name: '',
    last_name: '',
    scan_date: '',
    procedure_Details:'' ,
    desc: '',
    type: '',
    scan_image : '',

  });


  const Patientscan=((id)=>{
    console.log(id)
    fetch(`http://127.0.0.1:8000/exist_scan/${id}`)
    .then(resposne=> resposne.json())
    .then(res=>setUp(res))
    console.log(JSON.stringify(up, null, 2));
    
})



const Patientlab=((id)=>{
  console.log(id)
  fetch(`http://127.0.0.1:8000/exist_lab/${id}`)
  .then(resposne=> resposne.json())
  .then(res=>setUp(res))
  console.log(JSON.stringify(up, null, 2));
  
})

const Patientmed=((id)=>{
  console.log(id)
  fetch(`http://127.0.0.1:8000/exist_med/${id}`)
  .then(resposne=> resposne.json())
  .then(res=>setUp(res))
  console.log(JSON.stringify(up, null, 2));
  
})


    return(
        <div class="container">
    <div class="main-body">
    
          
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to="/admindashboard">Home</Link></li>
              <li class="breadcrumb-item"><a href="javascript:void(0)">{data.first_name}&nbsp;{data.last_name}</a></li>
              <li class="breadcrumb-item active" aria-current="page">EHR Details</li>
            </ol>
          </nav>
         
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src={data.image} alt="Admin" class="rounded-circle" width="150" />
                    <div class="mt-3">
                      <h4>{data.first_name}&nbsp;{data.last_name}</h4>
                      <p class="text-secondary mb-1">{data.addressline1}</p>
                      <p class="text-muted font-size-sm">{data.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 style={{padding:10, fontWeight: 'bold', fontFamily: 'century', color:'gray'}}>Scanned Documents</h3>
              <div class="card mt-3">
                
                <ul class="list-group list-group-flush">
                  {emp.map((item, index) => (
                     <li key={index} className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                        <div className='inner' style={{padding:30}}>
                            <h5><Link style={{textDecoration:'none'}} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{Patientscan(item.id)}}> Previous Scan Document</Link> </h5>
                        </div>
                     </li>
                  ))}
                </ul>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.first_name}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.email}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.phonenumber}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Blood Group</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.blood_grp}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.addressline1}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Admission Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {data.joining_date}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>

              <div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                  <div class="card ">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">
                        Lab Documents Of {data.first_name}&nbsp;{data.last_name} 
                        
                       
                      </i></h6>
                      {lab.map((item, index) => (
                     <li key={index} className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                        <div className='inner' style={{padding:30}}>
                            <h5><Link style={{textDecoration:'none'}} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{Patientlab(item.id)}}>Previous Lab Reports</Link> </h5>
                        </div>
                     </li>
                  ))}
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">Medical Documents Of {data.first_name}&nbsp;{data.last_name} </i></h6>
                      {med.map((item, index) => (
                     <li key={index} className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                        <div className='inner' style={{padding:30}}>
                            <h5><Link style={{textDecoration:'none'}} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={()=>{Patientmed(item.id)}}>Previous Medical Reports</Link> </h5>
                        </div>
                     </li>
                  ))}
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>

                          {/* Patient Scan Model */}

           <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"style={{fontWeight:'bold'}}>Previous Scan Report of {data.first_name}&nbsp;{data.last_name} </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div className='inner-div' style={{marginLeft:-100}}>
                          <p style={{fontFamily: 'century', fontWeight: 'bold'}}>Scaned Date: {up.scan_date}</p>
                          <p>Procedure: {up.procedure_Details}</p>
                          <p>Type: {up.desc}</p>
                        </div>
                        <div className='images' style={{overflow: 'hidden',position: 'relative',width: 500,height: 400, marginLeft:140}} >
                         <img src={up.scan_image} style={{width:500, height:500,}} className='img-fluid img-thumbnail'/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                      {/* Patient Lab Model */}

           <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"style={{fontWeight:'bold'}}>Previous Lab Report of {data.first_name}&nbsp;{data.last_name} </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='container' >
                            <div className='row' style={{border: ' 1px solid lightgrey' ,padding:10}} >
                              <div className='col-md-3'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Report Date :-</p>
                              </div>
                              <div className='col-md-9' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.report_date}</p>
                              </div>
                              <div className='col-md-3'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Lab Result :-</p>
                              </div>
                              <div className='col-md-9' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.result_Details}</p>
                              </div>
                              <div className='col-md-3'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Conclusion: :-</p>
                              </div>
                              <div className='col-md-9' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.conclusion}</p>
                              </div>
                            </div>
                          </div>  
                            <div className='images' style={{overflow: 'hidden',position: 'relative',width: 500,height: 400, marginLeft:140, marginTop:10}} >
                              <img src={up.report_image} style={{width:500, height:500,}} className='img-fluid img-thumbnail'/>
                            </div>
                          

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


            {/* Patient Lab Model */}

           <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"style={{fontWeight:'bold'}}>Previous Medical Report of {data.first_name}&nbsp;{data.last_name} </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='container' >
                            <div className='row' style={{border: ' 1px solid lightgrey' ,padding:10}} >
                              <h4 style={{fontWeight: 'bold', marginBottom:25, textAlign:'left'}}>Medical History</h4>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Primary Diaganosis :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.primary_diagnosis}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Allergies :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.allergies}</p>
                              </div>
                              <hr />
                              <h4 style={{fontWeight: 'bold', marginBottom:25, textAlign:'left'}}>Previous Medications</h4>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Medication Name :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.medication_name}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Dosage :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.Dosage}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Start Date :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.start_date}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>End Date :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.end_date}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10,}}>Reason for Prescription :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.reason_prescription}</p>
                              </div>
                              <div className='col-md-6'>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>Prescribing Doctor :-</p>
                              </div>
                              <div className='col-md-6' style={{textAlign: 'left'}}>
                                <p style={{fontFamily: 'century', fontWeight: 'bold', marginBottom:10}}>{up.prescribing_doctor}</p>
                              </div>
                            </div>
                          </div>  
                            <div className='images' style={{overflow: 'hidden',position: 'relative',width: 200,height: 200, marginLeft:220, marginTop:10}} >
                              <img src={up.prescription_image} style={{width:500, height:500,}} className='img-fluid img-thumbnail'/>
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

export default UploadEHR;