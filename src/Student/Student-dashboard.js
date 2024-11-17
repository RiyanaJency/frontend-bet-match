import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "./Student-sidebar"; // Import Sidebar component
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the components of Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  const student = {
    name: "Arun Kumar",
    rollNo: "12345",
    class: "Xll",
    bloodGroup: "O+",
    phone: "9876543210",
  };

  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Assignments Submitted",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch freely within its container
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Assignments: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="d-flex min-vh-100" >
      {/* Sidebar Section */}
      <div className="d-none d-md-block">
        <Sidebar /> {/* Include Sidebar component here */}
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-3 "style={{ backgroundColor: '#f7f7f7' }} >
        <Container className="mt-5">
          <Row className="justify-content-center">
            {/* Chart Section */}
            <Col xs={12} md={8} lg={8} xl={9} className="mb-4">
              <Card className="shadow-lg bg-light" style={{ height: "100%" }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
                  <h4 className="text-center mb-4">Assignments Submission Progress</h4>
                  <div style={{ position: "relative", width: "100%", height: "300px" }}>
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
