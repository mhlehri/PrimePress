import { createContext, useEffect, useState } from "react";
import { app } from "./../../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const auth = getAuth(app);

export const AuthContext = createContext(null);
// providers
const gPro = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosS = UseAxiosSecure();

  //   createUser with email and password
  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  //   add user image and Name

  const update = (name, img) => {
    return updateProfile(auth.currentUser, {
      photoURL: img,
      displayName: name,
    });
  };

  //   signIn with email and password
  const signIn = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  //   signOut with google
  const signG = () => {
    return signInWithPopup(auth, gPro);
  };

  //   signOut
  const signO = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   onAuthState
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedInUser = { email: userEmail };

      if (currentUser) {
        axiosS.post("/jwt", loggedInUser);
      } else {
        axiosS.post("/logout", loggedInUser);
      }
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      return unSub();
    };
  }, []);

  const userInformation = {
    user,
    loading,
    createUser,
    update,
    signIn,
    signG,
    signO,
  };

  return (
    <AuthContext.Provider value={userInformation}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
