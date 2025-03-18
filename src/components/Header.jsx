import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Home } from "lucide-react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-yellow-50 dark:bg-[#18181b] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/home">
          <h1 className="font-bold text-yellow-700 dark:text-yellow-400 text-2xl"></h1>
        </Link>
        <ul className="flex gap-4">
          {currentUser && (
            <Link
              to="/home"
              className="font-semibold text-yellow-700 hover:text-yellow-600 dark:text-yellow-200 dark:hover:text-yellow-300 flex items-center gap-2 hover:scale-110 transition-transform duration-200"
            >
              <Home className="w-6 h-6" />
            </Link>
          )}
          {currentUser && (
            <Link
              to="/compiler"
              className="font-semibold text-yellow-700 hover:text-yellow-600 dark:text-yellow-200 dark:hover:text-yellow-300 flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <li>Try it yourself</li>
            </Link>
          )}

          {currentUser && (
            <Link
              to="/about"
              className="font-semibold text-yellow-700 hover:text-yellow-600 dark:text-yellow-200 dark:hover:text-yellow-300 flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <li>About</li>
            </Link>
          )}

          <Link
            to="/profile-analytics"
            className="font-bold text-yellow-700 dark:text-yellow-200"
          >
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-yellow-700 dark:border-yellow-300"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
          <ThemeToggle />
        </ul>
      </div>
    </div>
  );
}
