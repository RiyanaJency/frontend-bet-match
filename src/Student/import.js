import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login'


import Student from "./Student-details";
import Assignment from "./Assignment"
import Result from "./Result";
import StudentDashboard from "./Student-dashboard";

function Studentimport(){
    return(
        <Router>

        <Routes>
           
       
          <Route path="/" element={<Login />} />
    
          <Route path="/Student-dashboard" element={<StudentDashboard />} />
          <Route path="/Assignment" element={<Assignment />} />
            <Route path="/Student-details" element={<Student />} />
            <Route path="/Result" element={<Result/>}/>

          
        </Routes>

    </Router>
    )

}

export default Studentimport