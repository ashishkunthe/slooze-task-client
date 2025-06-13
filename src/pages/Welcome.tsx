import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 relative overflow-hidden p-6">
      {/* Floating food icons randomly around the screen */}
      <div className="absolute inset-0 text-[5rem] opacity-10 select-none pointer-events-none z-0">
        <div className="absolute top-6 left-8 animate-pulse">🍕</div>
        <div className="absolute top-20 right-10 rotate-12 animate-bounce">
          🍔
        </div>
        <div className="absolute bottom-24 left-16 -rotate-6 animate-pulse">
          🥗
        </div>
        <div className="absolute bottom-8 right-12 rotate-3 animate-spin-slow">
          🍜
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 rotate-12 animate-pulse">
          🍣
        </div>
        <div className="absolute top-1/2 right-1/4 rotate-6 animate-bounce">
          🍩
        </div>
        <div className="absolute bottom-1/4 left-1/3 -rotate-3 animate-pulse">
          🍛
        </div>
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 text-center space-y-6">
        <h1 className="text-4xl font-bold text-orange-600">
          Welcome to Foodify!
        </h1>
        <p className="text-gray-600 text-lg">
          Discover delicious dishes, place your orders with ease, and enjoy an
          unforgettable dining experience. 🍽️
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;
