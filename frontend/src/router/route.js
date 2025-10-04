import { Route } from "react-router-dom";
import LoginPageNoForm from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NavPage from "../pages/NavPage";
import SignupPageForm from "../pages/SignupPage";

const PrivateRoute = ({ children }) => {
  const authToken = useSelector((state) => state.auth.token);
  const isAuthenticated = authToken;
  const AuthToken = localStorage.getItem("token");

  return isAuthenticated || AuthToken ? children : <Navigate to="/" replace />;
};
const PrivateRouteCheckLogin = ({ children }) => {
  const authToken = useSelector((state) => state.auth.token);
  const isAuthenticated = authToken;
  const AuthToken = localStorage.getItem("token");

  return isAuthenticated || AuthToken ? (
    <Navigate to="/userlist" replace />
  ) : (
    children
  );
};

const appRoutes = [
  <Route
    key="login"
    path="/login"
    element={
      <PrivateRouteCheckLogin>
        <LoginPageNoForm />
      </PrivateRouteCheckLogin>
    }
  />,
  <Route key="signup" path="/" element={<SignupPageForm />} />,
  <Route
    key="userlist"
    path="/userlist"
    element={
      <PrivateRoute>
        <NavPage />
      </PrivateRoute>
    }
  />,
  <Route key="catch-all" path="*" element={<Navigate to="/" replace />} />,
];

export default appRoutes;
