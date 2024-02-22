import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import './App.css'
import Header from './components/Header'
import Trial from './pages/Trial'

function App() {
  return (

    <>
    <Router>
      <div className='container'>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
