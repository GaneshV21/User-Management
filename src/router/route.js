import { Route } from "react-router-dom";
import LoginPageNoForm from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NavPage from "../pages/NavPage";

const PrivateRoute = ({ children }) => {
  const authToken = useSelector((state) => state.auth.token);
  const isAuthenticated = authToken;
  const AuthToken = localStorage.getItem("token");

  return isAuthenticated || AuthToken ? children : <Navigate to="/" replace />;
};

const appRoutes = [
  <Route key="login" path="/" element={<LoginPageNoForm />} />,
  <Route
    key="userlist"
    path="/userlist"
    element={
      <PrivateRoute>
        {" "}
        <NavPage />
      </PrivateRoute>
    }
  />,
  <Route key="catch-all" path="*" element={<Navigate to="/" replace />} />,
];

export default appRoutes;
