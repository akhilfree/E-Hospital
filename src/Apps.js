import DoctorDash from './pages/Doctor/DoctorDash';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
// import Navbar from './pages/Navbar';
import { Link } from 'react-router-dom';
import Login from './pages/Homepage/Login';
import Navbar from './pages/Homepage/Navbar';
import Reg from '../src/pages/Homepage/Reg';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import Doctors from './pages/Admin/Doctors';
import Available_doctor from './pages/Admin/Available_doctor';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorStatus from './pages/Admin/DoctorStatus';
import DoctorUpdate from './pages/Admin/DoctorUpdate';


import Patients from './pages/Admin/Patients';
import PatientDetails from './pages/Admin/PatientDetails';
import EHR from './pages/Admin/EHR';
import UploadEHR from './pages/Admin/UploadEHR';
import ExistEHR from './pages/Admin/EHR';
import ExistingEHR from './pages/Admin/ExistingEHR';

import Userhome from './pages/userDashboard/Userhome';
import Appointment from './pages/userDashboard/Appointment';
import ConfirmAppointment from './pages/userDashboard/ConfirmAppointment';
import AppointSch from './pages/Admin/AppointSch';
import Message from './pages/Payment/Message';
import DoctorLogin from './pages/Doctor/DoctorLogin';




function Apps() {
  return (
    <div>
     <Router>
        
        <Routes>
            <Route extact path="/" element={<Navbar />} />

              <Route path='/register' element={<Reg />} />
              <Route path='/login' element={<Login />} />
             
              <Route path='doctor/' element={<DoctorDash />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path='admindashboard/' element={<AdminDashboard />} />
              <Route path='/doctors' element={<Doctors />} />
              <Route path='available_doctor/' element ={<Available_doctor />} />
              <Route path='add_doctors/' element ={<AddDoctor />} />
              <Route path='/doctor_status' element={<DoctorStatus />} />
              <Route path='/doctor_updates/:id' element={<DoctorUpdate />} />

              <Route path='/patients' element={<Patients />} />
              <Route path='/patients_details' element={<PatientDetails />} />
              <Route path='/ehr_details' element={<EHR />} />
              <Route path='/upload_ehr/:id' element={<UploadEHR />} />
              <Route path='/ehr_exist' element={<ExistingEHR />} />

              <Route path='/user' element={<Userhome />} />
              <Route path='appointment/:username' element={<Appointment  />} />
              <Route path='appointment_confirm/:username/:doctor_name' element={<ConfirmAppointment />} />
              <Route path='appoint_sch/' element={<AppointSch />} />
              <Route path='success/:username' element={<Message />} />


              <Route path='doctor_login' element={<DoctorLogin />} />
              
              

              
        </Routes>
      </Router>
    </div>
  );
}

export default Apps;
