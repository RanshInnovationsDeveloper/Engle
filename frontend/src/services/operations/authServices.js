import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signup = async (email, password, username) => {
  let error = "";

  try {
    // Create user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await auth.currentUser
      .sendEmailVerification()
      .then(async () => {
        // Set user display name
        await userCredential.user.updateProfile({
          displayName: username,
        });

        // Add user data to Firestore
        await db
          .collection("users")
          .doc(userCredential.user.uid)
          .collection("user_info")
          .doc()
          .set({
            userId: userCredential.user.uid,
            userName: username,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    // Handle sign-up errors
    let errorCode = err.code;
    if (errorCode === "auth/email-already-in-use") {
      error = "This email is already in use!";
    } else {
      error = err.message;
    }
  }

  return { error };
};

export const signin = async (email, password) => {
  let error = "";
  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCrendential) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log(userCrendential?.data);
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
=======
        console.log(userCrendential?.data);
>>>>>>> 498c7dd66f02d8affebeda63f6c5b8590d8d2207
        if (userCrendential?.user?.emailVerified !== true)
          error = "user not exist!";
      })
      .catch((err) => {
        // Handle sign-up errors
        let errorCode = err.code;
        if (errorCode === "auth/internal-error") {
          // The email address is already in use by another account
          error = "Email or Password do not match!";
        } else {
          // Handle other sign-up errors
          error = err.message;
          // console.error(error);
        }
      });
  } catch (err) {
    error = err.message;
  }

  return { error };
};

export const logout = () => {
  auth.signOut();
};

export const forgotPassword = async ({ useremail, navigate }) => {
  try {
    await auth
      .sendPasswordResetEmail(useremail)
      .then(() => {
        navigate("/");
        toast.success(
          "email verification link sent successfully to your email"
        );
      })
      .catch((err) => {
        toast.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};
