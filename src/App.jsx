import './App.css'
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import CreatePool from "./Components/CreatePool";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeLayput from './Components/HomeLayout';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
    <>
    <ToastContainer />
    <Router>
    <Routes>
    {/* <Route path='' element={<HomeLayput/>}  /> */}
      <Route path='/' element= {<Home/>} />
      <Route path='/createpool' element={<CreatePool/>}  />
    </Routes>
    </Router>
    </>
  )
}

export default App
