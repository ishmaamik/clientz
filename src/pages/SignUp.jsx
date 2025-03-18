import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="relative flex items-center justify-center h-screen bg-yellow-50 dark:bg-[#18181b]">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      {/* Semi-transparent background overlay */}
      <div className="fixed inset-0 dark:yellow-50 dark:bg-[#18181b] opacity-50"></div>

      {/* Sign-up modal box */}
      <div className="relative z-10 p-8 bg-gradient-to-r from-yellow-100 to-yellow-100 dark:from-black dark:via-gray-900 dark:to-gray-800 border border-black dark:border-yellow-500 rounded-lg shadow-lg shaodw-black w-full max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 dark:text-gray-400 dark:hover:text-gray-600"
          onClick={() => navigate("/")} // navigate back to the landing page or close the modal
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-yellow-400">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-yellow-50 dark:bg-yellow-200 border border-gray-300 dark:border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-500"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-yellow-50 dark:bg-yellow-200 border border-gray-300 dark:border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-yellow-50 dark:bg-yellow-200 border border-gray-300 dark:border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-500"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-black text-yellow-50 dark:bg-yellow-600 dark:text-black p-3 rounded-lg font-semibold hover:bg-[#2c2c2c] dark:hover:bg-yellow-500 transition-colors disabled:opacity-70"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="text-center dark:text-gray-500 text-sm">or</div>
          <OAuth />
        </form>
        <div className="flex items-center justify-center mt-5">
          <p className="text-black dark:text-yellow-100 font-semibold">
            Have an account?
          </p>
          <Link to="/sign-in">
            <span className="text-yellow-800 dark:text-yellow-400 text-xl font-bold ml-1 hover:text-opacity-70 dark:hover:text-yellow-300 hover:underline">
              Sign In
            </span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
