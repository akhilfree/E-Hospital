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
        axios.get('http://127.0.0.1:8000/scheduled_appoint/?limit=500')
        .then((response)=>{setNameList(response.data)})
    },[])

   
    return(
        <div className="Ehr">
            <InsideNavbar1 />
            <div className="container" style={{marginTop: 20,marginLeft:100 }}>
                <h3 style={{padding:20, textAlign: 'center'}}><b>SCHEDULED APPOINTMENTS</b></h3>
                <div className="row shadow " style={{padding:20,width:1200, backgroundColor: 'white', marginBottom:20}}>
                    <div className='search' style={{padding:20, marginLeft:80}}>
                        <div className='row' >
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'style={{width:'30%'}}>
                                <input type='text' className='form-control' placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table className='table  table-hover table-lg'  style={{fontFamily: 'century',height:150}}>
                            <thead style={{fontSize:12}}>
                                <tr style={{height: 30}}>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Patient Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Doctor Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>specilaization</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Date</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Timing</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}> Fee</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Payment Status </th>
                                
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
                                <tr key={item.id} style={{height: 60}}>
                                    <td>{item.id}</td>
                                    <td style={{textAlign:'left', paddingLeft: 20}}>
                                    {/* <img src={item.image} class="img-rounded" alt={item.first_name} style={{width:50, height:50}}/>&emsp; */}
                                        {item.first_name} &nbsp;{item.last_name}
                                    </td>
                                    <td>{item.doctor_name}</td>
                                    <td>{item.spec}</td>
                                    <td>{item.appointment_date}</td>
                                    <td>{item.appoint_time}</td>
                                    <td>{item.consult_fee}</td>
                                    {item.appoint_status === '0' ? (
                                        <td style={{color: 'red', fontWeight: 'bold'}}>{item.payment_status}</td>
                                        ): (
                                            <td style={{color: 'green', fontWeight: 'bold'}}>Success</td>
                                    )}
                                   
                                        
                                    
                                    
                                </tr>
                                    )
                              
                            })
                            }
                            </tbody>
                        </table>

                    </div>        
                        
                </div>
            </div>



            




            
        </div>
    );
}

export default ExistingEHR;