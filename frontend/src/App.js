import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import './App.css'
import Header from './components/Header'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import { useEffect } from 'react'
import { setauthUserData,setuserEmail, setuserName } from './slices/authSlice'
import { useDispatch } from "react-redux"
import { auth } from './services/firebase'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    auth.onAuthStateChanged((userCrendential) => {      
        if(userCrendential!==null){
          dispatch(setauthUserData(userCrendential.uid));
          dispatch(setuserEmail(userCrendential.email));
          dispatch(setuserName(userCrendential.displayName));         
        }
        else{
          dispatch(setauthUserData(null));
          dispatch(setuserEmail(null));
          dispatch(setuserName(null));
        }       
      });
      
  }, [dispatch])


  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
      </Routes>
      <ToastContainer />
    
 
    </>
  )
}

export default App
