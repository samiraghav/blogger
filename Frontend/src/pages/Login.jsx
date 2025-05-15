import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(loginUser(form));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in.",
        confirmButtonColor: "#3b82f6",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: res.payload || "Invalid credentials. Please try again.",
        confirmButtonColor: "#ef4444",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-600 hover:text-red-700">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
