import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuth();

  // If the user is authenticated, render the element, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
