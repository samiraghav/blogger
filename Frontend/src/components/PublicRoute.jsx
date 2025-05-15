import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PublicRoute = ({ element }) => {
  const isAuthenticated = useAuth();

  // If the user is already authenticated, redirect to the home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PublicRoute;
