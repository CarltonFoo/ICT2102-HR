import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Descriptions, Badge, Table, Button, Space } from "antd";
import { Pie } from '@ant-design/charts';

import useStyles from "./payslipStyle";
import PayslipData from "../../data/payslip.json";
const columns = [
    {
      title: 'Transaction ID',
      dataIndex: "transactionID",
    },
    {
      title: 'Basic Pay',
      dataIndex: "basicPay",
    },
    {
      title: 'Bonus',
      dataIndex: "bonus",
    },
    {
      title: 'Total OT Hours',
      dataIndex: "totalOTHours",
    },
];
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

const Payslip = () => {
  const classes = useStyles();

  return (
    <div>
      <div class="m-auto w-11/12">
      <p class="text-2xl font-bold my-6">Payslip</p>
        <Descriptions title="">
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>

        <div class="flex flex-wrap -mx-2 overflow-hidden">
        
          <div class="my-2 px-2 w-8/12 overflow-hidden">
            <Table 
            columns={columns} 
            dataSource={PayslipData} 
            bordered
            pagination={false}
            title={() => 'Earnings'}/>
            <Table 
            columns={columns} 
            dataSource={PayslipData} 
            bordered
            pagination={false}
            title={() => 'Claims'}/>
            <Table 
            columns={columns} 
            dataSource={PayslipData} 
            bordered
            pagination={false}
            title={() => 'Deductions'}/>
          </div>

          <div class="my-2 px-2 w-4/12 overflow-hidden">
            <Pie {...config} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Payslip;