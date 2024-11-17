import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="container-fluid bg-dark min-vh-100">
      <div className="row">
        <div className="col-12 col-md-2 vh-100 d-flex flex-column">
          {/* Sidebar Content */}
          <div className="sidebar d-flex flex-column justify-content-between">
            <div>
              {/* Logo Section */}
              <div className="m-4 d-flex align-items-center">
                <i className="bi bi-mortarboard-fill me-2 fs-3 text-white" />
                <span className="brand-name fs-3 text-white fw-bold">Faculty</span>
              </div>

              {/* Navigation Links */}
              <div className="list-group list-group-flush">
                <Link 
                  to="/Dashboard" 
                  className="list-group-item py-3 bg-dark text-white d-flex align-items-center sidebar-link hover-link"
                >
                  <i className="bi bi-speedometer2 fs-5 me-3" />
                  <span className="fs-5">Dashboard</span>
                </Link>
                <Link 
                  to="/student" 
                  className="list-group-item py-3 bg-dark text-white d-flex align-items-center sidebar-link hover-link"
                >
                  <i className="bi bi-person-circle fs-5 me-3" />
                  <span className="fs-5">StudentDetails</span>
                </Link>
                <Link 
                  to="/Faculty" 
                  className="list-group-item py-3 bg-dark text-white d-flex align-items-center sidebar-link hover-link"
                >
                  <i className="bi bi-pencil-square fs-5 me-3" />
                  <span className="fs-5">Enrollsubject</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="list-group-item py-3 bg-dark text-white d-flex align-items-center sidebar-link hover-link"
                >
                  <i className="bi bi-clipboard-check fs-5 me-3" />
                  <span className="fs-5">profile</span>
                </Link>
                <Link 
                  to="/Login" 
                  className="list-group-item py-3 bg-dark text-white d-flex align-items-center sidebar-link hover-link"
                >
                  <i className="bi bi-power fs-5 me-3" />
                  <span className="fs-5">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style for hover effect */}
      <style jsx>{`
        .sidebar-link:hover {
          background-color: #007bff; /* Blue color on hover */
          color: #ffffff; /* Ensures the text stays white */
          transform: scale(1.05); /* Slight scaling effect */
        }

        .sidebar-link {
          border: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .sidebar {
          background-color: #212529; /* Dark background color for the sidebar */
        }
      `}</style>
    </div>
  );
}

export default Sidebar;


