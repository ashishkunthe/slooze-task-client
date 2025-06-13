import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/menu");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Login
        </h2>

        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Login
        </button>
        <div className="text-center text-sm text-gray-600">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-orange-600 font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
