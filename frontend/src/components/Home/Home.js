import React from "react";
import ReactTooltip from "react-tooltip";
import { Card, Col, Row, Typography, Statistic } from "antd";
import Mood from "../Mood/Mood";
import { InfoCircleTwoTone } from "@ant-design/icons";
import "../../assets/css/home.css";
import PayslipJSON from "../../data/payslip.json";
import SalaryBreakdown from "../Home/salaryBreakdown"
import Availability from "./staffAvailability";

//#region CountdownTimer
const { Countdown } = Statistic;
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var lastday = function (y, m) {
  return new Date(y, m + 1, 0).getDate();
}
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
const deadline = new Date(year, month, lastday(year, month) + 1).getTime();
//#endregion

var cardStyle = {
  bordered: true,
  fontSize: 16,
  textAlign: 'center',
  fontWeight: 'bold',
}

const Home = () => {
  var userSess = JSON.parse(sessionStorage.getItem("user"))
  var userData = PayslipJSON[0][userSess.username]

  var userSess = JSON.parse(sessionStorage.getItem("user"));
  var userData = PayslipJSON[0][userSess.username];

  var userSess = JSON.parse(sessionStorage.getItem("user"));
  var userData = PayslipJSON[0][userSess.username];

  return (
    <div>
      <Mood></Mood>
      <div class="m-auto w-11/12">
        <div class="text-2xl font-bold my-6">
          Dashboard
          <div data-tip="Quick overview of staff availability &amp; salary" class="inline">
            <InfoCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#A3A989" class="inline-block" className={"px-4"} />
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
              <Availability></Availability>
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