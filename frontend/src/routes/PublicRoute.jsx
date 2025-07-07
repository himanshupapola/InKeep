import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function PublicRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loading text="Loading..." />;

  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
}
