import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./homeStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Button, Card, Col, Row } from "antd";
import Navbar from "../Navbar/Navbar";
import { Pie } from '@ant-design/charts';
import { InfoCircleOutlined, EyeFilled } from '@ant-design/icons';

var data = [
  {
    type: 'Slice 1',
    value: 27,
  },
  {
    type: 'Slice 2',
    value: 25,
  },
  {
    type: 'Slice 3',
    value: 18,
  },
  {
    type: 'Slice 4',
    value: 15,
  },
  {
    type: 'Slice 5',
    value: 10,
  },
  {
    type: 'Slice 6',
    value: 5,
  },
];

var config = {
  appendPadding: 10,
  data: data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: function content(_ref) {
      var percent = _ref.percent;
      return ''.concat((percent * 100).toFixed(0), '%');
    },
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
};

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};


const Home = () => {
  const classes = useStyles();


  return (
    <div>
      <div class="m-auto w-11/12">
        <p class="text-2xl font-bold my-6">
          Dashboard
          {/* Need to add hover styling and tooltip*/}
          <InfoCircleOutlined />
        </p>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={true}>
                6<br></br>Welfare Pack Requests
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                10<br></br>Annual Leave Left
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                5<br></br>Days to Pay Day
              </Card>
            </Col>
          </Row>
        </div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={12}>
              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="Staff Availability"
              >
                <a href="/availability">View All Staff Availability ></a>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="Salary Breakdown"
                extra={<EyeFilled />}
              >
                <Pie {...config} />
                <a href="/payslip">View Full Summary ></a>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );


};

export default Home;