import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "../hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  register: (
    fullName: string,
    email: string,
    password: string,
    role: "vendor" | "customer"
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, retrieve their role from local storage
        const storedRole = localStorage.getItem(
          `userRole_${firebaseUser.uid}`
        ) as "vendor" | "customer" | null;

        // Fetch user data from Firestore (excluding role)
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data(); // Fetch data, but role will not be read from here
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || userData.name || "User",
              email: firebaseUser.email || userData.email || "",
              role: storedRole || "customer", // Prioritize stored role, default to customer
            });
          } else {
            console.warn("User found in Firebase Auth but not in Firestore.");
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "User",
              email: firebaseUser.email || "",
              password: "",
              role: storedRole || "customer", // Prioritize stored role, default to customer
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUser(null);
        }
      } else {
        // User is signed out, clear local storage role
        const uid = user?.id; // Get UID before clearing user state
        setUser(null);
        if (uid) {
          localStorage.removeItem(`userRole_${uid}`);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, user?.id]); // Added user.id to dependencies to track changes for local storage key

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Upon successful login, re-fetch the user's role if it exists locally
      const storedRole = localStorage.getItem(
        `userRole_${firebaseUser.uid}`
      ) as "vendor" | "customer" | null;
      if (storedRole) {
        // If role is stored locally, update the user state with it
        setUser((prevUser) => ({
          ...prevUser!, // Assume prevUser exists because firebaseUser is available
          id: firebaseUser.uid,
          name: firebaseUser.displayName || prevUser?.name || "User",
          email: firebaseUser.email || prevUser?.email || "",
          role: storedRole,
        }));
      } else {
        // If no role is found in local storage, default to 'customer'
        // In a real app, this would be a problem if role is not returned by backend or stored.
        localStorage.setItem(`userRole_${firebaseUser.uid}`, "customer");
        setUser((prevUser) => ({
          ...prevUser!,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || prevUser?.name || "User",
          email: firebaseUser.email || prevUser?.email || "",
          role: "customer",
        }));
      }

      toast({ title: "Login Successful", description: "Welcome back!" });
      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      let errorMessage = "Login failed. Please check your credentials.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (user?.id) {
        localStorage.removeItem(`userRole_${user.id}`); // Clear specific user's role
      }
      await signOut(auth);
      setUser(null); // Ensure user state is cleared
      toast({ title: "Logged Out", description: "See you next time!" });
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    role: "vendor" | "customer"
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: fullName });

      // Store role locally in localStorage
      localStorage.setItem(`userRole_${firebaseUser.uid}`, role);

      // Send minimal user data to your backend (role is NOT included here for Firestore storage)
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }), // Role is removed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Backend registration failed with status: ${response.status}`
        );
      }

      // Update local user state with the role from local storage
      setUser({
        id: firebaseUser.uid,
        name: fullName,
        email: firebaseUser.email || email,
        role: role,
      });

      toast({
        title: "Registration Successful",
        description: "You can now sign in.",
      });
      return true;
    } catch (error: any) {
      console.error("Registration failed:", error);
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
