import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Welfare from "./components/Welfare/Welfare";
import Payslip from "./components/Payslip/Payslip";
import Availability from "./components/Availability/Availability";
import WelfareHistory from "./components/WelfareHistory/WelfareHistory";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
        <Switch>

            <Route
              key="home"
              path="/"
              exact
              component={Home}
            ></Route>

            <Route
              key="welfare"
              path="/welfare"
              exact
              component={Welfare}
            ></Route>

            <Route
              key="payslip"
              path="/payslip"
              exact
              component={Payslip}
            ></Route>

            <Route
              key="availability"
              path="/availability"
              exact
              component={Availability}
            ></Route>

            <Route
              key="welfarehistory"
              path="/history"
              exact
              component={WelfareHistory}
            ></Route>
           
        </Switch>
    </Router>
  );
}

export default App;
