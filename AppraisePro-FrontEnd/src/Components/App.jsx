import AddFaculty from './AddFaculty';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import FacultyLogin from './FacultyLogin'
import FacultyFormPage from './FacultyFormPage';
import ChangePassword from './ChangePassword';
import FacultyDashBoard from './FacultyDashBoard';
import FacultyHomePage from './FacultyHomePage';
import AddPublication from './AddPublication';
import AddDocument from './AddDocument';
import StudentLogin from './StudentLogin';
import AdminHomePage from './AdminHomePage';
import StudentHomePage from './StudentHomePage';
function App() {
  return (
      <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/add" element={<AddFaculty />} />
            <Route path="/addPublication" element={<AddPublication />} />
            <Route path="/addDocument" element={<AddDocument />} />
            <Route path="/faculty" element={<FacultyFormPage />} />
            <Route path="/faculty/home" element={<FacultyHomePage />} />
            <Route path="/faculty/login" element={<FacultyLogin />} />
            <Route path="/faculty/dashboard" element={<FacultyDashBoard />} />
            <Route path="/faculty/first/changePassword" element={<ChangePassword />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/home" element={<StudentHomePage />} />
          </Routes>
      </Router>
    
      </>
  );
}


export default App;
