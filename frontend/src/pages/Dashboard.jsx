import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Loading";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/read", { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingScreen text="Collecting your whispers from yesterday..." />;
}

export default Dashboard;
