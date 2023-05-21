import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { token } = useSelector(({ auth }) => ({
    token: auth.token,
  }));

  return token ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
