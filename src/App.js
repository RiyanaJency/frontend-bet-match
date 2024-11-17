import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import Login from './Login';
import Enrollsubject from './Faculty';
import BarChartComponent from'./Dashboard';
import Student from './student';
import FacultyProfile from './profile';

// student//
import Studentdetails from "./Student-details";
import Assignment from "./Assignment"
import Result from "./Result";
import StudentDashboard from "./Student-dashboard";



// import Studentimport from './Student/import'
function App() {
  return (
    <Router>
      <div className="container mt-4">
        
        <Routes>
          <Route path="/" element={<Login />} /> 


          <Route path="/Faculty" element={<Enrollsubject/>} /> 
          <Route path="/Dashboard" element={<BarChartComponent />} /> 
          <Route path="/student" element={<Student />} /> 
          <Route path="/profile" element={<FacultyProfile/>} /> 
          <Route path="/Login" element={<Login/>} /> 
          

          <Route path="/Student-dashboard" element={<StudentDashboard />} />
          <Route path="/Assignment" element={<Assignment />} />
          <Route path="/Student-details" element={<Studentdetails />} />
          <Route path="/Result" element={<Result />} />







          

        </Routes>
      </div>
    </Router>
    // <>
    // {/* <Studentimport/> */}
    // </>
  );
}

export default App;

