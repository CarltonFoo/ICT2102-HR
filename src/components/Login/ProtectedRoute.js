import React, { useContext, useEffect }   from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {


  useEffect(() => {
      console.log("sess", sessionStorage.getItem("isAuthenticated"))
  })
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
