import React, { useContext }   from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(isAuthenticated) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"/>
        )
      }
    />
  );
};
export default ProtectedRoute;
