import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut, sendPasswordResetEmail, signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from '../firebase';
import { setauthUserId, setuserEmail, setuserName } from '../../slices/authSlice';
import { getSubscriptionDataToken } from "./subscriptionService";
import { setSubscriptionToken } from "../../slices/subscriptionSlice";




export const signup = async (email, password, username) => {
  let error = "";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user).then(async () => {
      await updateProfile(user, {
        displayName: username,
      });
      const docRef = doc(db, "Register User Data", user.uid);
      const user_Data = {
        userId: user.uid,
        userName: username,
        createdAt: new Date(),
        email: user.email,
      };
      const docSnap = await getDoc(docRef);

      if (docSnap.exists())
        await updateDoc(docRef, { user_Data });
      else
        await setDoc(docRef, { user_Data });

    }).catch((err) => {
      console.log("There is some error to send the verification link -", err);
    });
  } catch (err) {
    let errorCode = err.code;
    if (errorCode === "auth/email-already-in-use") {
      error = "This email is already in use!";
    } else {
      error = err.message;
    }
  }

  return { error };
};





export const signin = async (email, password,dispatch) => {
  let error = "";

  try {
    await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        error = "User not exist!";
      } else {
        localStorage.setItem('authUserId', user.uid);
        localStorage.setItem('flashCardCategory', "unseen");

        // for subscription
        const {token} = await getSubscriptionDataToken(email, user.uid);
        if (token) {
          localStorage.setItem('subscriptionToken', token);
          dispatch(setSubscriptionToken(token));
        }else
        {
          localStorage.setItem('subscriptionToken', null);
          dispatch(setSubscriptionToken(null));
        }
      }
    }).catch((err) => {
      let errorCode = err.code;
      if (errorCode === "auth/invalid-credential") {
        error = "Email or Password do not match!";
      } else {
        error = err.message;
      }
    });
  } catch (err) {
    error = err.message;
  }

  return { error };
};





export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  signOut(auth);
};





export const forgotPassword = async ({ useremail, navigate }) => {
  try {
    await sendPasswordResetEmail(auth, useremail).then(() => {
      navigate("/");
      toast.success("Email verification link sent successfully to your email");
    }).catch((err) => {
      toast.error(err);
    });
  } catch (error) {
    console.log(error);
  }
};





export const onFirebaseStateChanged=(dispatch)=>{

  onAuthStateChanged(auth, (user) => {
    if (user !== null && user.emailVerified === true) {
      dispatch(setauthUserId(user.uid));
      dispatch(setuserEmail(user.email));
      dispatch(setuserName(user.displayName));
      localStorage.setItem('authUserId', user.uid);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.displayName);
    }
    else {
      dispatch(setauthUserId(null));
      dispatch(setuserEmail(null));
      dispatch(setuserName(null));
      localStorage.setItem('authUserId', null);
      localStorage.setItem('userEmail', null);
      localStorage.setItem('userName', null);

    }
  });
}