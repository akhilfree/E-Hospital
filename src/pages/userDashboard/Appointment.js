import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Appointment = (props) => {
  const { username } = useParams();

  const [department, setDepartment] = useState('');
  const [consultation, setConsultation] = useState('');
  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/search/?t=${department}&q=${consultation}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch data from an API or another data source
    axios
      .get('http://127.0.0.1:8000/doctor_schedule/')
      .then((response) => {
        setResult1(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  // Use the useEffect hook to fetch data when the component mounts or when department/consultation changes
  useEffect(() => {
    if (department && consultation) {
      fetchData();
    }
  }, [department, consultation]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/search/?t=${department}&q=${consultation}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Welcome to appointment page {username}</h3>

      <form onSubmit={handleSubmit}>
        <div className='inner_div' style={{ border: '1px solid lightgrey' }}>
          <div className='row' style={{ padding: 40 }}>
            <div className='col-md-6'>
              <div className='form-group'>
                <label style={{ marginLeft: -160, fontWeight: 'bold', fontSize: 15, fontFamily: 'century' }}>Department</label>
                <select className='form-control' value={department} placeholder='Search Here' onChange={(e) => setDepartment(e.target.value)} style={{textAlign:'center'}} required>
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
            <div className='col-md-6'>
              <div className='form-group'>
                <label style={{ marginLeft: -160, fontWeight: 'bold', fontSize: 15, fontFamily: 'century' }}>Consultation Time</label>
                <select value={consultation} onChange={(e) => setConsultation(e.target.value)} className='form-control'  style={{textAlign:'center'}} required>
                                  <option>---Specialization--- </option>
                                  {result1.length > 0 ? (
                                    result1.map((item, index) => (
                                      <option key={index} value={item.consultation_time}>{item.consultation_time}</option>
                                      ))
                                      ) : (
                                        <p style={{ color: 'red', fontWeight: 'bold' }}>No results to display</p>
                                      )}
                                </select>
              </div>
            </div>
          
          </div>
        </div>
      </form>

      <div className="container" style={{ margin: 50 }}>
        <div className="row">
          {result.length > 0 ? (
            result.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card" style={{ width: '22rem' }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black' }}>
                      {item.doctor_name}
                    </h5>
                    <h5 className="card-text">{item.specialization}</h5>
                    <p className="card-text">
                      {item.consultation_from} - {item.consultation_to}
                    </p>
                    <p className="card-text">{item.consultation_time}</p>
                  </div>
                  <Link to = {`/appointment_confirm/${username}/${item.doctor_name}`} className="btn btn-success">
                    Click Here For Appointment
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red', fontWeight: 'bold' }}>No results to display</p>
          )}
        </div>
      </div>
      <p>jhkl</p>
    </div>
  );
}

export default Appointment;
