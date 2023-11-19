import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './images/logo/edit.png';
import Cross from './images/logo/cross.jpg';
import InsideNavbar1 from './InsideNavbar1';



function EHR(){
    const navigate = useNavigate();
    const[nameList, setNameList] = useState([]);
    const[search, setSearch] = useState("");
    

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/add_patient?limit=500')
        .then((response)=>{setNameList(response.data)})
    },[])


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



    return(
        <div  className="EHR">
           <InsideNavbar1 />
            <div className="container" style={{marginTop: 20,marginLeft:200 }}>
                <div className="row shadow p-3 mb-5 bg-body-tertiary rounded" style={{padding: 100,width:'98%', backgroundColor: 'white'}}>
                    <div className='search' style={{padding:20}}>
                        <div className='row'>
                            <div className='col-md-6'>

                            </div>
                            <div className='col-md-6'style={{width:'30%'}}>
                                <input type='text' className='form-control' placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                        </div>
                    </div>
                <table className='table  table-hover table-bordered '  style={{width:1100,fontFamily: 'century',}}>
                            <thead style={{fontSize:22}}>
                                <tr>
                                <th style={{fontSize:18, fontWeight: 'bold', padding: 20}}>ID</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>First Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Last Name</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Contact No</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Registered Date</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Availability</th>
                                <th style={{fontSize:18, fontWeight: 'bold',padding: 20}}>Operations</th>
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
                                        {item.first_name}
                                    </td>
                                    <td>{item.last_name}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.joining_date}</td>
                                        {item.status === '0' ? (
                                        <td style={{color: 'red', fontWeight: 'bold'}}>No Active</td>
                                        ): (
                                            <td style={{color: 'green', fontWeight: 'bold'}}>Active</td>
                                    )}
                                    {/* Add more table cells here */}
                                    <td>
                                         <Link to={`/upload_ehr/${item.id}`}><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></Link>&emsp;
                                        {/* <a href='#' onClick={()=>{Docupdate(item.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={Edit} alt='dgfhdg' style={{width:20, height:20,}} /></a>&emsp; */}
                                        {/* <a href='#' onClick={()=>{DocDelete(item.id)}}><img src={Cross} alt='dgfhdg' style={{width:20, height:20,}} /></a>  */}
                                    </td>
                                </tr>
                                    )
                              
                            })
                            }
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

        </div>
    );
}

export default EHR;