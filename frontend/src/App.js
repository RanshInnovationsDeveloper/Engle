import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from './pages/Homepage'
import './App.css'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import { ToastContainer } from 'react-toastify'
import ForgotPasspage from './pages/ForgotPasspage'
import ContactUspage from './pages/ContactUspage'
import AboutUspage from './pages/AboutUspage'
import FlashCardpage from './pages/FlashCardpage'
import FavouritesPage from './pages/FavouritesPage'
import MynotesPage from "./pages/MynotesPage";
import Notecard from "./components/Notecard";
import Stories from "./pages/Stories";
import IndividualStory from "./pages/IndividualStory";
import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";
import Upcomingpage from "./pages/Upcomingpage";
import Spinner from "./components/Spinner";
import { setLoading } from './slices/authSlice';
import { useDispatch, useSelector } from "react-redux"



function App() {
    const { loading, authUserId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
      dispatch(setLoading(true));
        const loadingTimer = setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000); 

        return () => clearTimeout(loadingTimer); 
    }, [location.pathname]);


  return (
    <>
    {loading ? (
      <Spinner/>
    ): (
      <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<ContactUspage />} />
        <Route path="/about" element={<AboutUspage />} />
        <Route path="/flashcards" element={<FlashCardpage />} />
        <Route path="/upcoming" element={<Upcomingpage />} />
        <Route path="/story" element={<Stories/>} />
        {/*Individual story page */}
        <Route path="/story/:id" element={<IndividualStory/>} />
        {/* <Route path="/context" element={} /> */}
        {/* <Route path="/ambiguouswords" element={} /> */}


        <Route
          path="/login"
          element={

            <OpenRoute>
              <Loginpage />
            </OpenRoute>

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

        {/* <Route
          path="/flashcards"
          element={

            <PrivateRoute>
              <FlashCardpage/>
            </PrivateRoute>

          }
        /> */}

        <Route
          path="/favourites"
          element={

            <PrivateRoute>
              <FavouritesPage />
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
            <PrivateRoute>
              <Notecard />
            </PrivateRoute>
          }
        />
      
        <Route
          path="/learnwithfriends"
          element={

            <PrivateRoute>
              {/* < LearnWithFriend /> */}
            </PrivateRoute>

          }
        />



      </Routes>
      <ToastContainer position="bottom-center" reverseOrder={false} />
    </>
    )}
    </>
    
    
  );
};

export default App;
