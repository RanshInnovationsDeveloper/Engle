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
        <Route path="/flashcards" element={<FlashCardpage />} />
        {/* <Route path="/story" element={} /> */}
        {/* <Route path="/context" element={} /> */}
        {/* <Route path="/ambiguouswords" element={} /> */}


        <Route
          path="/login"
          element={

            // <OpenRoute>
              <Loginpage />
            // </OpenRoute>

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
          path="/favourites"
          element={

            <PrivateRoute>
              <FavouritesPage/>
              </PrivateRoute>

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
  <Route
          path="/notecard"
          element={
            <OpenRoute>
              <Notecard />
              </OpenRoute>
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
