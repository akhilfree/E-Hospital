import React, {Component,useState, useEffect } from "react";
import InsideNavbar from "./InsideNavbar";

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles/css/add_doc.css';

function Patients() {
    const [data, setData] = useState([]);
  
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

    const[currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6;
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
  
    return (
        <div className="area">
            <InsideNavbar />

            <div className="container" style={{padding: 100,}}>
                <div className="row">
                {records.map((item) => (
                    <div key={item.id} className="col-md-4">
                    <Card data={item} />
                    {/* <Button variant="success" onClick={handleShow} >More Details</Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>Haiiii Hello</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
                    </div>
                ))}
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

        

               
                 <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
              




        </div>    
    );
  }
  
  function Card({ data }) {
    return (
      <div>
            <div class="card mb-3 shadow p-3 mb-5 bg-white rounded" style={{maxWidth: 540 ,}}>
            <div class="row g-0">
            <div class="col-md-12">
                <div class="card-body">
                <h5 class="card-title" style={{fontSize:20, fontWeight:'bold', fontFamily:'century'}}>{data.first_name} &ensp; {data.last_name} </h5>
                <p class="card-text" style={{fontSize:17, fontWeight:'bold', fontFamily:'century'}}>{data.dob}</p>
                <p class="card-text" style={{fontSize:15, fontWeight:'bold', fontFamily:'century'}}>{data.email} </p>
                <p class="card-text" style={{fontSize:17, fontWeight:'bold', fontFamily:'century'}}>{data.phonenumber}</p>
                <p class="card-text" style={{fontSize:15, fontWeight:'bold', fontFamily:'century'}}>{data.joining_date} </p>
                
                </div>
            </div>
            </div>
        </div>
      </div> 
    );
  }
  
  export default Patients;