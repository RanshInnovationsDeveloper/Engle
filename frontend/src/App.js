import  {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import './App.css'
import Header from './components/Header'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'

function App() {
  return (

    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/register' element={<Registerpage/>}/>
      </Routes>
    
    </>
  )
}

export default App
