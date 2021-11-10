import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Descriptions, Badge, Table, Button, Space } from 'antd';
import { Pie } from '@ant-design/charts';
import jsonfile from 'jsonfile';

import "./payslip.css";
import PayslipJSON from "../../data/payslip.json";

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
  appendPadding: 10,
  data: piedata,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  legend: {
    layout: 'vertical',
    position: 'bottom',
    flipPage: false,
    itemName: {
      style: {
        fontSize: 16
      }
    }
  },
  label: {
    type: 'spider',
    labelHeight: 40,
    content: '{name}\n${value}',
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
};


const Payslip = () => {
  
  return (
    <div>
      { PayslipJSON && PayslipJSON.length>0 && PayslipJSON.map((data)=>
        <div class="m-auto w-11/12">
          <p class="text-2xl font-bold my-6">Payslip</p>
          <Descriptions title="">
            <Descriptions.Item label="Name">{data.user.name}</Descriptions.Item>
            <Descriptions.Item label="Total Hours Worked">{data.user.totalHoursWorked}</Descriptions.Item>
            <Descriptions.Item label="Remaining Annual Leave">{data.user.remainingAnnualLeave}</Descriptions.Item>
            <Descriptions.Item label="Transaction ID">{data.user.transactionID}</Descriptions.Item>
            <Descriptions.Item label="Total OT Hours">
              {data.user.totalOTHours}
            </Descriptions.Item>
          </Descriptions>

          <div class="flex flex-wrap overflow-hidden border">
          
            <div class="w-7/12 overflow-hidden">
              <Descriptions title="" layout="vertical" bordered labelStyle="">
                <Descriptions.Item label="Earnings" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>
              <Descriptions title="" bordered>
                <Descriptions.Item label="Basic Pay" span={3} className="alignright">${data.earnings.basicPay.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Bonus" span={3} className="alignright">${data.earnings.bonus.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="OT Pay" span={3} className="alignright">${data.earnings.OTpay.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Total" span={3} className="alignright total">${totalEarnings.toFixed(2)}</Descriptions.Item>
              </Descriptions>

              <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="Claims" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>

              <Descriptions title="" bordered>
                {Object.keys(data.claims).map((claim) =>
                  <Descriptions.Item label={data.claims[claim].claimDescription} span={3} className="alignright">${data.claims[claim].claimAmt.toFixed(2)}</Descriptions.Item>
                )}
                <Descriptions.Item label="Total" span={3} className="alignright total">${totalClaims.toFixed(2)}</Descriptions.Item>
              </Descriptions>

              <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="Deductions" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>            
              <Descriptions title="" bordered>
                <Descriptions.Item label="CPF Contribution" span={3} className="alignright">${data.deductions.CPFcontribution.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Tax Deductions" span={3} className="alignright">${data.deductions.taxDeduction.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Total" span={3} className="alignright total">${totalDeductions.toFixed(2)}</Descriptions.Item>
              </Descriptions>
            </div>

            <div class="my-2 px-2 w-5/12 overflow-hidden">
              <Pie {...config} />
              <div class="p-12 font-bold text-center">
                  Total: ${totalOverall.toFixed(2)}
              </div>
            </div>

          </div>

        </div>
       )}
    </div>
  );
};

export default Payslip;