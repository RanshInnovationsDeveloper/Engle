import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import './App.css'
import Header from './components/Header'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import { ToastContainer } from 'react-toastify'
import ForgotPasspage from './pages/ForgotPasspage'
import Categorypage from './pages/Categorypage'
import ContactUspage from './pages/ContactUspage'
import AboutUspage from './pages/AboutUspage'
import FlashCardpage from './pages/FlashCardpage'
import FavouritesPage from './pages/FavouritesPage'


function App() {


  // const [fetchingUser, setFetchingUser] = useState(true);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const snapshot = await db.collection("users").doc(user.uid).get();
  //       setCurrentUser({ ...snapshot.data(), userId: user.uid });
  //     } else {
  //       setCurrentUser(null);
  //     }
  //     setFetchingUser(false);
  //   });
  // }, []);


  return (
    <>   
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/forgotpass' element={<ForgotPasspage />} />
        <Route path='/category' element={<Categorypage />} />
        <Route path='/contact' element={<ContactUspage />} />
        <Route path='/about' element={<AboutUspage />} />
        <Route path='/flashcards' element={<FlashCardpage />} />
        <Route path='/favourites' element={<FavouritesPage />} />
      </Routes>
      <ToastContainer />
    
 
    </>
  )
}

export default App 