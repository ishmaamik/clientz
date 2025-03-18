import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-yellow-50 dark:bg-[#18181b]">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      {/* Semi-transparent background overlay */}

      <div className="fixed inset-0 dark:yellow-50 dark:bg-[#18181b] opacity-50"></div>

      {/* Sign-in modal box */}
      <div className="relative z-10 p-8 bg-gradient-to-r from-yellow-100 to-yellow-100 dark:from-black dark:via-gray-900 dark:to-gray-800 border border-black dark:border-yellow-500 rounded-lg shadow-lg shaodw-black w-full max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 dark:text-gray-400 dark:hover:text-gray-600"
          onClick={() => navigate("/")} // navigate back to the landing page or close the modal
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-yellow-400">
          Welcome back
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="name@email.com"
            id="email"
            className="bg-yellow-50 dark:bg-yellow-200 border border-gray-300 dark:border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-500"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-yellow-50 dark:bg-yellow-200 border border-gray-300 dark:border-yellow-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-500"
            onChange={handleChange}
          />
          {/*<div className="flex justify-between items-center text-sm dark:text-yellow-600">
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>*/}
          <button
            disabled={loading}
            className="bg-black text-yellow-50 dark:bg-yellow-600 dark:text-black p-3 rounded-lg font-semibold hover:bg-[#2c2c2c] dark:hover:bg-yellow-500 transition-colors disabled:opacity-70"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="text-center dark:text-gray-500 text-sm">or</div>
          <OAuth />
        </form>
        <div className="mt-6 text-center dark:text-gray-700">
          <p>
            New to DoodleDuck?{" "}
            <Link
              to="/sign-up"
              className="text-yellow-800 text-xl dark:text-yellow-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {error.message || "Something went wrong!"}
          </p>
        )}
      </div>
    </div>
  );
}
