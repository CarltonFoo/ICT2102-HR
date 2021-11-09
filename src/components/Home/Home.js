import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { Table, Card, Col, Row } from "antd";
import Mood from "../Mood/Mood"
import { Pie } from '@ant-design/charts';
import { InfoCircleTwoTone, EyeFilled } from '@ant-design/icons';
import CountDownTimer from "../CoundownTimer/CountDownTimer";
import "../../assets/css/home.css"

import StaffAvailability from "../../data/staffAvailability.json";
import PayslipJSON from "../../data/payslip.json";



// START Availability
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

// END Availability

// START Payslip
var totalClaims = 0;
var totalEarnings = PayslipJSON[0].earnings.basicPay + PayslipJSON[0].earnings.bonus + PayslipJSON[0].earnings.OTpay;
var totalDeductions = PayslipJSON[0].deductions.CPFcontribution + PayslipJSON[0].deductions.taxDeduction;

Object.keys(PayslipJSON[0].claims).map((claim) =>
  totalClaims += PayslipJSON[0].claims[claim].claimAmt
)

var totalOverall = totalEarnings + totalClaims - totalDeductions;

var piedata = [
  {
    type: 'Base Pay',
    value: PayslipJSON[0].earnings.basicPay,
  },
  {
    type: 'Bonus Pay',
    value: PayslipJSON[0].earnings.bonus,
  },
  {
    type: 'OT Pay',
    value: PayslipJSON[0].earnings.OTpay,
  },
  {
    type: 'Claims',
    value: totalClaims,
  },
  {
    type: 'CPF',
    value: PayslipJSON[0].deductions.CPFcontribution,
  },
  {
    type: 'Tax',
    value: PayslipJSON[0].deductions.taxDeduction,
  },
];

var config = {
  data: piedata,
  angleField: 'value',
  colorField: 'type',
  radius: 0.5,
  height: 340,
  legend: {
    layout: 'vertical',
    position: 'bottom',
    flipPage: false,
    itemName: {
      style: {
        fontSize: 16,
      }
    }
  },
  label: {
    type: 'spider',
    labelHeight: 40,
    content: '{name}\n${value}',
    style: {
      fontSize: 12,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
};

var linkStyle = {
  position: 'absolute',
  bottom: 0,
  right: 10,
  marginBottom: 10
}

var cardStyle = {
  fontSize: 20,
  textAlign: 'center',
  fontWeight: 'bold'
}
// END Payslip

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};


const Home = () => {

  return (
    <div>
      <div class="m-auto w-11/12">
        <div class="text-2xl font-bold my-6">Dashboard
          {/* Need to add hover styling and tooltip*/}
          <div data-tip="Quick overview of team availability, salary" class="inline">
            <InfoCircleTwoTone twoToneColor="#A3A989" class="inline-block" className={"px-4"} />
          </div>
          <ReactTooltip place="right" effect="solid" />

        </div>
        <div className="site-card-wrapper">
          {PayslipJSON && PayslipJSON.length > 0 && PayslipJSON.map((data) =>
            <Row gutter={16}>
              <Col span={8}>
                <Card style={cardStyle} bordered={true}>
                  6<br></br>
                  Welfare Pack Requests</Card>
              </Col>
              <Col span={8}>
                <Card style={cardStyle} bordered={true}>
                  {data.user.remainingAnnualLeave}<br></br>
                  Annual Leave Left</Card>
              </Col>
              <Col span={8}>
                <Card style={cardStyle} bordered={true}>
                  <div class="countdown">
                    <CountDownTimer></CountDownTimer>
                  </div>
                  Days to Pay Day</Card>
              </Col>
            </Row>
          )}
        </div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={16}>
              <Card
                style={{ marginTop: 16, height: 520 }}
                type="inner"
                title="Staff Availability"
              >
                <Table pagination={false} columns={columns} dataSource={StaffAvailability.slice(5, 10)} />
                <Link to="/availability"
                  style={ linkStyle }>
                  View All Staff Availability &#62;</Link>
              </Card>
            </Col>

            <Col span={8}>
              <Card
                style={{ marginTop: 16, height: 520 }}
                type="inner"
                title="Salary Breakdown"
                extra={<EyeFilled data-tip="Click to hide total salary" style = {{ cursor: 'pointer' }}/> }
              >
                <Pie {...config} />
                <div class="p-6 font-bold text-center">
                  Total: ${totalOverall.toFixed(2)}
                </div>
                <Link to="/payslip"
                  style={ linkStyle }>
                  View Full Summary &#62;</Link>
              </Card>
            </Col>
          </Row>
          <Mood></Mood>
        </div>
      </div>
    </div>
  );


};

export default Home;