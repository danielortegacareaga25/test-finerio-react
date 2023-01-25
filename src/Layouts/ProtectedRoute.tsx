import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../store/reducers/auth.reducer";

const ProtectedRoute = () => {
  const selectorUser = useSelector(selectToken);
  const location = useLocation();

  return selectorUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
