import AdminPage from './AdminPage';
import AddFaculty from './AddFaculty';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import FacultyLogin from './FacultyLogin'
import FacultyFormPage from './FacultyFormPage';
import ChangePassword from './ChangePassword';
import FacultyDashBoard from './FacultyDashBoard';
import FacultyHomePage from './FacultyHomePage';
import Temporarypage from './Temporarypage';
function App() {
  return (
      <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temp" element={<Temporarypage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/add" element={<AddFaculty />} />
            <Route path="/faculty" element={<FacultyFormPage />} />
            <Route path="/faculty/home" element={<FacultyHomePage />} />
            <Route path="/faculty/login" element={<FacultyLogin />} />
            <Route path="/faculty/dashboard" element={<FacultyDashBoard />} />
            <Route path="/faculty/first/changePassword" element={<ChangePassword />} />
          </Routes>
      </Router>
    
      </>
  );
}


export default App;
