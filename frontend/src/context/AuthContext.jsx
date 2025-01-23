import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserLoggedIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/check", { credentials: "include" });
      if (!res.ok) {
        // Handle response errors
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch user.");
      }
      const data = await res.json();
      setAuthUser(data.user || null); // Ensure null if user is not authenticated
    } catch (error) {
      toast.error(error.message || "Unable to check authentication.");
      console.error("Error in checkUserLoggedIn:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
