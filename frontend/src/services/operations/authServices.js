import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, updateEmail, updatePassword } from "firebase/auth";
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





export const signin = async (email, password, dispatch) => {
  let error = "";

  try {
    await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        error = "User not exist!";
      } else {
        localStorage.setItem('authUserId', user.uid);
        localStorage.setItem('flashCardCategory', "unseen");
        console.log(user);
        // for subscription
        const { token } = await getSubscriptionDataToken(email, user.uid);
        if (token) {
          localStorage.setItem('subscriptionToken', token);
          dispatch(setSubscriptionToken(token));
        } else {
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





export const onFirebaseStateChanged = (dispatch) => {

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


// during sign up send the otp to phone number after recapctha verification
export async function onSignupSendOTP(phoneNumber) {

  auth.languageCode = 'en';
  await onCaptchVerify();
  const appVerifier = await window.recaptchaVerifier;
  await signInWithPhoneNumber(auth, phoneNumber.toString(), appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast.success("OTP sended successfully!");
      return;
    })
    .catch((error) => {
      toast.error(error);
      console.log("error in onsignup function", error);
    });
}



export async function onCaptchVerify() {
  try {
    auth.languageCode = 'en';
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
          },
          "expired-callback": () => { },
        }
      );
    }
  } catch (err) {
    console.log("error in onCaptchVerify function", err);
  }
}




export function onOTPVerify(otp) {

  auth.languageCode = 'en';
  window.confirmationResult.confirm(parseInt(otp)).then(async (res) => {
    toast.success("OTP verified successfully !");
  })
    .catch((err) => {
      // console.log("error in verify otp ", err);
      toast.error('invalid otp !');
    });
}



export async function setUserEmailAndSendVerificationLink(email) {
  try {

    // update the email
    await updateEmail(auth.currentUser, email.toString()).then(async() => {

      // send the verification link to the email
      await sendEmailVerification(auth.currentUser).then(() => {
        console.log(auth.currentUser);
        toast.success("Email verification link sent successfully to your email");
      }).catch((err) => {
        console.log("There is some error to send the verification link -", err);
        toast.error(err);
      });


    }).catch((error) => {
      console.log("error in email update", error);
      toast.error(error);
    });

  } catch (err) {
    console.log("error in setUserEmailAndSendVerificationLink function", err);
  }
}



export async function setUserPassword(password) {
  try {
    await updatePassword(auth.currentUser, password).then(() => {
      toast.success("Password updated successfully!");
    }).catch((error) => {
      console.log("error in password update", error);
    });
  } catch (err) {
    console.log("error in setUserPassword function", err);
  }
}