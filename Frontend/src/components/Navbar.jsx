import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SignUp from "../components/SingUp";
import Login from "../components/Login";

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    alert("Logged out successfully!");
  };

  return (
    <>
      <div className="flex justify-end gap-4 p-4 bg-gray-100 shadow-md">
        {token ? (
          <>
            <span className="text-gray-700 font-semibold">Logged in ✅</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignUp(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      <SignUp
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        setToken={setToken} // ✅ Pass setToken to child
      />
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        setToken={setToken} // ✅ Pass setToken to child
      />
    </>
  );
};

export default Navbar;
