import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white">
      <header className="fixed w-[100%] top-0 z-50 bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-3 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-700 sm:inline">
              BLOGGER
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/my-blogs"
                  className="text-gray-700 hover:text-gray-600 font-medium transition"
                >
                  My Blogs
                </Link>
                <Link
                  to="/create"
                  className="text-gray-700 hover:text-red-600 font-medium transition"
                >
                  Create New
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="text-gray-700 hover:text-gray-700 font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

    </nav>
  );
};

export default Navbar;
