import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Welfare from "./components/Welfare/Welfare";
import Payslip from "./components/Payslip/Payslip";
import Availability from "./components/Availability/Availability";
import WelfareHistory from "./components/WelfareHistory/WelfareHistory";
/*Temp: HR VIEW UIs */
import HRinventory from "./components/WelfareHR/WelfareInventory";
import HRapproval from "./components/WelfareHR/WelfareApproval";

import "antd/dist/antd.css";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import { AuthProvider } from "./components/Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route
            key="login"
            path="/login"
            exact
            component={Login}
          ></Route>

          <Navbar>
            <ProtectedRoute
              key="home"
              path="/"
              exact
              component={Home}
            ></ProtectedRoute>

            {/* <Route key="login" path="/login" exact component={Login}></Route> */}

            <ProtectedRoute
              key="welfare"
              path="/welfare"
              exact
              component={Welfare}
            ></ProtectedRoute>

            <ProtectedRoute
              key="payslip"
              path="/payslip"
              exact
              component={Payslip}
            ></ProtectedRoute>

            <ProtectedRoute
              key="availability"
              path="/availability"
              exact
              component={Availability}
            ></ProtectedRoute>

            <ProtectedRoute
              key="welfarehistory"
              path="/history"
              exact
              component={WelfareHistory}
            ></ProtectedRoute>
            <ProtectedRoute
              key="welfareinventory"
              path="/inventory"
              exact
              component={HRinventory}
            ></ProtectedRoute>
            <ProtectedRoute
              key="welfareapproval"
              path="/approval"
              exact
              component={HRapproval}
            ></ProtectedRoute>
          </Navbar>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;