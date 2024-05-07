import { Routes, Route} from "react-router-dom";
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
import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";
import Upcomingpage from "./pages/Upcomingpage";
import Spinner from "./components/Spinner";
import FavouritesCategoryPage from "./pages/FavouritesCategoryPage.jsx"
import { useSelector } from "react-redux"
import ErrorPage from "./pages/ErrorPage.jsx";
import SomethingwentwrongPage from "./pages/SomethingwentwrongPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import IndividualStory from "./pages/IndividualStory.jsx";

import Stories from "./pages/Stories.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { loading } = useSelector(state => state.auth);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/contact" element={<ContactUspage />} />
            <Route path="/about" element={<AboutUspage />} />
            <Route path="/flashcards" element={<FlashCardpage />} />
            <Route path="/ambiguous_words" element={< Upcomingpage />} />
            <Route path="/learn_with_context" element={< Upcomingpage />} />
            {/* <Route path="/learn_with_story" element={< Upcomingpage />} /> */}
            <Route path="/learn_with_friends" element={< Upcomingpage />} />
            <Route path="/error" element={< SomethingwentwrongPage />} />
            <Route path="*" element={< ErrorPage />} />

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
                  <ForgotPasspage />
                </OpenRoute>

              }
            />
            <Route
              path="/verifyemail"
              element={

                <OpenRoute>
                  <EmailVerificationPage />
                </OpenRoute>

              }
            />

            {/* Learn with story route */}
            <Route path="/learn_with_story" element={<Stories/>}/>

            {/* individual Story Route */}
            <Route path="/story/:id" element={
              <PrivateRoute>
            <IndividualStory/>
              </PrivateRoute>
            }/>
           
           {/* Dashboard Route */}
           <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
           }/>
           
            <Route
              path="/favourites/:type"
              element={

                <PrivateRoute>
                  <FavouritesPage />
                </PrivateRoute>

              }
            />
            <Route
              path="/favourites/"
              element={

                <PrivateRoute path={"/favourites/"}>
                  <FavouritesCategoryPage />
                </PrivateRoute>

              }
            />


            <Route
              path="/mynotes"
              element={

                <PrivateRoute path={"/mynotes"}>
                  <MynotesPage />
                </PrivateRoute>

              }
            />

          </Routes>
          <ToastContainer position="bottom-center" reverseOrder={false} autoClose={2000} hideProgressBar={true} />
        </>
      )}
    </>


  );
};

export default App;
