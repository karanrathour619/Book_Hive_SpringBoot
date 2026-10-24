import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider()

// authProvider
export const AuthProvide = ({children}) => {
    // Check localStorage for a mock user session when developing locally
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('localUser');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    // register a user
    const registerUser = async(email, password) => {
        if (auth && import.meta.env.VITE_API_KEY) {
            return await createUserWithEmailAndPassword(auth, email, password);
        }
        // Local dev mock register
        const mockUser = { email, displayName: email.split('@')[0], uid: "local-" + Date.now() };
        localStorage.setItem('localUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        return { user: mockUser };
    }

    // User login 
    const loginUser = async(email, password) => {   
        if (auth && import.meta.env.VITE_API_KEY) {
            return await signInWithEmailAndPassword(auth, email, password);
        }
        // Local dev mock login
        const mockUser = { email, displayName: email.split('@')[0], uid: "local-" + Date.now() };
        localStorage.setItem('localUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        return { user: mockUser };
    }

    const signInWithGoogle = async() => {
        if (auth && import.meta.env.VITE_API_KEY) {
            return await signInWithPopup(auth, googleProvider);
        }
        // Local dev mock Google sign in
        const mockUser = { email: "user@gmail.com", displayName: "Demo User", photoURL: "https://randomuser.me/api/portraits/men/82.jpg", uid: "google-demo" };
        localStorage.setItem('localUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        return { user: mockUser };
    }

    // logout
    const logout = () => {
        localStorage.removeItem('localUser');
        setCurrentUser(null);
        if (auth && import.meta.env.VITE_API_KEY) {
            return signOut(auth);
        }
        return Promise.resolve();
    }

    // manage User
    useEffect(() => {
        if (!auth || !import.meta.env.VITE_API_KEY) {
            setLoading(false);
            return;
        }
        try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (err) {
            console.warn("Failed to attach auth state listener:", err);
            setLoading(false);
        }
    }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}