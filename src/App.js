import './App.css';
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

function App() {
  return (
   <>
   <ToastContainer/>
   <Routes>
   <Route path ="/" element={<Home/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/login" element={<Login/>}/>
   </Routes>

   </>
  );
}

export default App;
