import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loading text="Loading..."/>;

  return isLoggedIn ? children : <Navigate to="/login" />;
}
