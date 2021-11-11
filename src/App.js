import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Welfare from "./components/Welfare/Welfare";
import WelfareForm from "./components/Welfare/WelfarePackForm";
import WelfarePackSelection from "./components/Welfare/WelfarePackSelection";
import Payslip from "./components/Payslip/Payslip";
import Availability from "./components/Availability/Availability";
import WelfareHistory from "./components/WelfareHistory/WelfareHistory";
/*Temp: HR VIEW UIs */
import HRinventory from "./components/WelfareHR/WelfareInventory";
import HRapproval from "./components/WelfareHR/WelfareApproval";
// import WelfareHistory from "./components/WelfareHistory/WelfareHistory";
/* - end HR VIEW UIs */

import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar>
          <Switch>
            <Route key="login" path="/login" exact component={Login}></Route>
            <Route key="home" path="/" exact component={Home}></Route>
            <Route key="welfare" path="/welfare" exact component={Welfare}></Route>
            <Route key="payslip" path="/payslip" exact component={Payslip}></Route>
            <Route key="availability" path="/availability" exact component={Availability}></Route>
            <Route key="welfarehistory" path="/history" exact component={WelfareHistory}></Route>
            <Route key="welfareinventory" path="/inventory" exact component={HRinventory}></Route>
            <Route key="welfareapproval" path="/approval" exact component={HRapproval}></Route>
          </Switch>
        </Navbar>
      </Router>
    </div>
  );
}

export default App;
