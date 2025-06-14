import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState("member");
  const [region, setRegion] = useState("India");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    console.log({ email, password, name, role, region });
    try {
      const response = axios.post(`${URL}/auth/register`, {
        email,
        password,
        name,
        role,
        region,
      });
      const data = (await response).data;
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/restaurants");
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Register
        </h2>

        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Name"
          ref={nameRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="India">India</option>
            <option value="America">America</option>
          </select>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Register
        </button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-600 font-medium cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
