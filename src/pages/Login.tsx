import { useRef } from "react";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log({ email, password });

    // You can now send this to your login API or validate it
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
      </div>
    </div>
  );
}

export default Login;
