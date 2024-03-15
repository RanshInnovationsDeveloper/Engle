import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

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

import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";
import MynotesPage from "./pages/MynotesPage";
import Notecard from "./components/Notecard";

function App() {

  const dispatch = useDispatch();
  const navgiate = useNavigate();
  const { authUserId } = useSelector((state) => state.auth);


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category" element={<Categorypage />} />
        <Route path="/contact" element={<ContactUspage />} />
        <Route path="/about" element={<AboutUspage />} />
<<<<<<< HEAD
<<<<<<< HEAD
      
=======
        <Route path="/flashcards" element={<FlashCardpage />} />
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
        <Route path="/flashcards" element={<FlashCardpage />} />
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207
        {/* <Route path="/story" element={} /> */}
        {/* <Route path="/context" element={} /> */}
        {/* <Route path="/ambiguouswords" element={} /> */}


        <Route
          path="/login"
          element={

<<<<<<< HEAD
<<<<<<< HEAD
            <OpenRoute>
              <Loginpage />
            </OpenRoute>
=======
            // <OpenRoute>
              <Loginpage />
            // </OpenRoute>
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
            // <OpenRoute>
              <Loginpage />
            // </OpenRoute>
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207

          }
        />

        <Route
          path="/register"
          element={

            <OpenRoute>
              <Registerpage />
            </OpenRoute>

          }
        />

        <Route
          path="/forgotpass"
          element={

            <OpenRoute>
              < ForgotPasspage />
            </OpenRoute>

          }
        />

        <Route
          path="/proflie"
          element={

            <PrivateRoute>
              {/* < profile /> */}
            </PrivateRoute>

          }
        />

        <Route
<<<<<<< HEAD
<<<<<<< HEAD
          path="/flashcards"
          element={

            <PrivateRoute>
              <FlashCardpage/>
            </PrivateRoute>

          }
        />

        <Route
=======
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207
          path="/favourites"
          element={

            <PrivateRoute>
<<<<<<< HEAD
<<<<<<< HEAD
              <FavouritesPage />
            </PrivateRoute>
=======
              <FavouritesPage/>
              </PrivateRoute>
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
              <FavouritesPage/>
              </PrivateRoute>
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207

          }
        />

        <Route
          path="/mynotes"
          element={

            <PrivateRoute>
              <MynotesPage />
            </PrivateRoute>

          }
        />
        {/*This route is for checking notecard it can be removed/modified afterwards */}
<<<<<<< HEAD
<<<<<<< HEAD
        <Route
=======
  <Route
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
  <Route
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207
          path="/notecard"
          element={
            <OpenRoute>
              <Notecard />
<<<<<<< HEAD
<<<<<<< HEAD
            </OpenRoute>
=======
              </OpenRoute>
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
              </OpenRoute>
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207
          }
        />
        {/**/}
        <Route
          path="/learnwithfriends"
          element={

            <PrivateRoute>
              {/* < LearnWithFriend /> */}
            </PrivateRoute>

          }
        />



      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
