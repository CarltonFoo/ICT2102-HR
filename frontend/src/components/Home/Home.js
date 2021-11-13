import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { Table, Card, Col, Row, Typography, Statistic } from "antd";
import Mood from "../Mood/Mood";
import ReactDOM from "react-dom";
import { InfoCircleTwoTone } from "@ant-design/icons";
import "../../assets/css/home.css";
import StaffAvailability from "../../data/staffAvailability.json";
import PayslipJSON from "../../data/payslip.json";
import SalaryBreakdown from "./salaryBreakdown";

//#region CountdownTimer
const { Countdown } = Statistic;
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
};
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
const deadline = new Date(year, month, lastday(year, month) + 1).getTime();
//#endregion

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Leave Start Date",
    dataIndex: "leaveStartDate",
  },
  {
    title: "Leave End Date",
    dataIndex: "leaveEndDate",
  },
  {
    title: "Leave Type",
    dataIndex: "leaveType",
  },
  {
    title: "Covering Person",
    dataIndex: "coveringPerson",
  },
];

var linkStyle = {
  position: "absolute",
  bottom: 10,
  right: 10,
};

var cardStyle = {
  bordered: true,
  fontSize: 16,
  textAlign: "center",
  fontWeight: "bold",
};
// END Payslip

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const Home = () => {
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  var userSess = JSON.parse(sessionStorage.getItem("user"));
  var userData = PayslipJSON[0][userSess.username];

  return (
    <div>
      <Mood></Mood>
      <div class="m-auto w-11/12">
        <div class="text-2xl font-bold my-6">
          Dashboard
          {/* Need to add hover styling and tooltip*/}
          <div
            data-tip="Quick overview of team availability, salary"
            class="inline"
          >
            <InfoCircleTwoTone
              style={{ fontSize: "18px" }}
              twoToneColor="#A3A989"
              class="inline-block"
              className={"px-4"}
            />
          </div>
          <ReactTooltip place="right" effect="solid" />
        </div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card style={cardStyle} bordered={true}>
                <Typography style={{ fontSize: 30, color: "#3b82f6" }}>
                  6
                </Typography>
                Welfare Pack Requests
              </Card>
            </Col>
            <Col span={8}>
              <Card style={cardStyle} bordered={true}>
                <Typography style={{ fontSize: 30, color: "#3b82f6" }}>
                  {userData.user.remainingAnnualLeave}
                </Typography>
                Annual Leave Left
              </Card>
            </Col>
            <Col span={8}>
              <Card style={cardStyle} bordered={true}>
                <Countdown
                  valueStyle={{ fontSize: 30, color: "#3b82f6" }}
                  value={deadline}
                  format="D"
                />
                Days to Pay Day
              </Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={16}>
              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="Staff Availability"
              >
                <Table
                  style={{ marginBottom: 20 }}
                  pagination={false}
                  columns={columns}
                  dataSource={StaffAvailability.slice(5, 10)}
                />
                <Row>
                  <Link to="/availability" style={linkStyle}>
                    View All Staff Availability &#62;
                  </Link>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <SalaryBreakdown></SalaryBreakdown>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
