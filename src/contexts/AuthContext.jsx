import { auth, db } from "/src/firebase";
import { doc, collection, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState, useMemo, useContext } from "react";
import Loading from "/src/components/Loading";

export const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

// Functions
function AuthContextProvider({ children }) {
  const [loginLoading, setLoginLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async (user) => {
    if (user) {
      try {
        const snapshot = await getDoc(doc(db, "admins", user.uid));
        setIsAdmin(snapshot.exists());
      } catch (err) {
        alert(err);
      }
    } else {
      setIsAdmin(false);
    }
    setLoginLoading(false);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      checkAdmin(user);
    });

    return unsub;
  }, []);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    signOut(auth).then(() => {
      setCurrentUser(false);
    });
  }

  return (
    <authContext.Provider value={{ login, logout, currentUser, isAdmin }}>
      {loginLoading ? <Loading fullScreen /> : children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
