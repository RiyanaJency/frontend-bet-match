import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FacultyNav from "./Faculty-navbar"; // Import Sidebar component
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
  // Sample data for the bar chart
  const allSubjects = ["Tamil", "English", "Maths", "Science", "Social"];
  const students = [
    { id: 1, name: "John Doe", subjects: ["Maths", "Tamil"] },
    { id: 2, name: "Jane Smith", subjects: ["English", "Tamil"] },
    { id: 3, name: "Riyana", subjects: ["Science", "Social"] },
    { id: 4, name: "Kaviya", subjects: ["Social", "Maths"] },
    { id: 5, name: "Reena", subjects: ["Social", "Science"] },
  ];

  // Count how many students are enrolled in each subject
  const subjectCounts = allSubjects.map((subject) => ({
    subject,
    count: students.filter((student) => student.subjects.includes(subject)).length,
  }));

  // Define colors for each subject
  const subjectColors = {
    Tamil: "rgba(255, 0, 0, 0.6)", // Red
    English: "rgba(54, 162, 235, 0.6)", // Blue
    Maths: "rgba(75, 192, 192, 0.6)", // Green
    Science: "rgba(255, 159, 64, 0.6)", // Orange
    Social: "rgba(153, 102, 255, 0.6)", // Purple
  };

  // Assign colors to each subject based on the subjectColors object
  const barColors = subjectCounts.map((data) => subjectColors[data.subject]);

  // Define bar chart data
  const barChartData = {
    labels: subjectCounts.map((data) => data.subject), // X-axis labels (subjects)
    datasets: [
      {
        label: "Number of Students",
        data: subjectCounts.map((data) => data.count), // Y-axis values (student counts)
        backgroundColor: barColors, // Assign specific colors to each bar
        borderColor: barColors.map((color) => color.replace("0.6", "1")), // Make border color more solid
        borderWidth: 1, // Bar border width
      },
    ],
  };

  // Define bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top",
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#000", // Y-axis label color
        },
      },
    },
  };

  return (
 <>
 <FacultyNav/>
 
      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex justify-content-center align-items-center p-3"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <Card className="shadow-lg bg-light">
                <Card.Body>
                  <h4 className="text-center mb-4">Subjects Enrollment Bar Chart</h4>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "400px",
                    }}
                  >
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BarChartComponent;
