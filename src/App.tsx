
import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Tasks from './pages/tasks';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import CreateOrUpdateTask from './pages/createOrUpdateTask';
import TaskInfos from './pages/taskInfos';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <div className="App">
        <Header />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/createOrUpdate/:id" element={<CreateOrUpdateTask/>} />
          <Route path="/tasks/info/:id" element={<TaskInfos/>} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
