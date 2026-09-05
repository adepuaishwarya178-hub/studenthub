import { Link } from "react-router-dom";
import "./Timetable.css";

function Timetable() {
  const schedule = [
    ["Monday", "Computer Networks", "9:00 AM", "10:00 AM"],
    ["Monday", "Artificial Intelligence", "10:00 AM", "11:00 AM"],
    ["Tuesday", "DBMS", "9:00 AM", "10:00 AM"],
    ["Tuesday", "Operating Systems", "11:00 AM", "12:00 PM"],
    ["Wednesday", "Web Technologies", "10:00 AM", "11:00 AM"],
    ["Thursday", "Artificial Intelligence", "9:00 AM", "10:00 AM"],
    ["Friday", "Computer Networks", "11:00 AM", "12:00 PM"],
  ];

  return (
    <div className="timetable-page">

      <nav className="timetable-nav">
        <div className="logo">🎓 StudentHub</div>

        <Link to="/dashboard">
          ← Dashboard
        </Link>
      </nav>

      <main className="timetable-container">

        <div className="timetable-heading">
          <h1>📅 My Timetable</h1>
          <p>Keep track of your weekly class schedule.</p>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

    </div>
  );
}

export default Timetable;