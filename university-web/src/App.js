// valid jsx
//function App() {
//  const universityName= "University Hub";
//
//  return (
//    <div className="main-container">
//      <h1>Welcome to {universityName}</h1>
//      <p>Manage your academic life.</p>
//    </div>
//  );
//}

//export default App;

import Home from './components/Home';
import About from './components/About';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Contact from './components/Contact';
import CoursesPage from './components/CoursesPage';
import StudentsPage from './components/StudentsPage';
import CourseDetails from './components/CourseDetails';
import Login from './components/Login';

function App() {
  return (
    <div className="p-4">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/students" element={<StudentsPage/>}/>
        <Route path="/courses" element={<CoursesPage/>}/>
        <Route path="/courses/:id" element={<CourseDetails/>}/>
        <Route path="/about" element={<About />} />
      </Routes> 
    </div>
  );
}

export default App;