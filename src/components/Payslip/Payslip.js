import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Descriptions, DatePicker, Space } from 'antd';
import { Pie } from '@ant-design/charts';
import moment from 'moment';

import "./payslip.css";
import PayslipJSON from "../../data/payslip.json";

var totalClaims, totalEarnings, totalDeductions, totalOverall, totalBasicPay, totalBonus, totalOTpay, totalCPF, totalTax, piedata, claimsData, rangeStart, rangeEnd, config, userSess, userData;

function getPayslipData(start, end) {
  userSess = JSON.parse(sessionStorage.getItem("user"))
  userData = PayslipJSON[0][userSess.username]
  totalClaims = totalEarnings = totalDeductions = totalOverall = totalBasicPay = totalBonus = totalOTpay = totalCPF = totalTax = 0.00
  claimsData=[]
  piedata=[]

  if (start === end) {
    totalBasicPay = userData.months[start].earnings.basicPay
    totalBonus = userData.months[start].earnings.bonus
    totalOTpay = userData.months[start].earnings.OTpay
    totalCPF = userData.months[start].deductions.CPFcontribution
    totalTax = userData.months[start].deductions.taxDeduction
    for (var claimstart in userData.months[start].claims) {
      totalClaims += userData.months[start].claims[claimstart].claimAmt
        claimsData.push(userData.months[start].claims[claimstart])
    }
  } else {
    for (var month in userData.months) {
      if ((start <= month) && (end >= month)) {
        totalBasicPay += userData.months[month].earnings.basicPay
        totalBonus += userData.months[month].earnings.bonus
        totalOTpay += userData.months[month].earnings.OTpay
        totalCPF += userData.months[month].deductions.CPFcontribution
        totalTax += userData.months[month].deductions.taxDeduction
        for (var claim in userData.months[month].claims) {
          totalClaims += userData.months[month].claims[claim].claimAmt
          claimsData.push(userData.months[start].claims[claim])
        }
      }
    }
  }

  totalEarnings = totalBasicPay + totalBonus + totalOTpay;
  totalDeductions = totalCPF + totalTax;
  totalOverall = totalEarnings + totalClaims - totalDeductions;
  
  piedata = [
    {
      type: 'Base Pay',
      value: totalBasicPay,
    },
    {
      type: 'Bonus Pay',
      value: totalBonus,
    },
    {
      type: 'OT Pay',
      value: totalOTpay,
    },
    {
      type: 'Claims',
      value: totalClaims,
    },
    {
      type: 'CPF',
      value: totalCPF,
    },
    {
      type: 'Tax',
      value: totalTax,
    },
  ];

  
  config = {
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

}

getPayslipData(moment().subtract(1, 'month').format('YYYY-MM'), moment().subtract(1, 'month').format('YYYY-MM'))

function disabledDate(current) {
  return current && current > moment().startOf('month');
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const Payslip = () => {
    
  const onChange = (value, dateString) => {
    rangeStart = value[0]?.format('YYYY-MM')
    rangeEnd = value[1]?.format('YYYY-MM')
    getPayslipData(rangeStart, rangeEnd)
  }

  const forceUpdate = useForceUpdate()

  return (
    <div class="payslipcard">
      <div class="m-auto pb-12 w-11/12">
          <p class="text-2xl font-bold my-6">Payslip</p>
          <div class="my-8">
            <Descriptions title="" bordered column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}>
              {/* {console.log("data", data)} */}
              <Descriptions.Item label="Name" className="userinfo">{userData.user.name}</Descriptions.Item>
              <Descriptions.Item label="Total Hours Worked" className="userinfo">{userData.user.totalHoursWorked}</Descriptions.Item>
              <Descriptions.Item label="Remaining Annual Leave" className="userinfo">{userData.user.remainingAnnualLeave}</Descriptions.Item>
              <Descriptions.Item label="Total OT Hours" className="userinfo">
                {userData.user.totalOTHours}
              </Descriptions.Item>

              <Descriptions.Item label="Month Range" className="userinfo">
                <Space direction="vertical" size={12}>
                  <DatePicker.RangePicker 
                  picker="month"
                  format="YYYY-MM"
                  disabledDate={disabledDate} 
                  onCalendarChange={onChange}
                  onChange={forceUpdate}/>
                </Space>
              </Descriptions.Item>

            </Descriptions>

          </div>

          <div class="flex flex-wrap overflow-hidden border">

            <div class="w-7/12 overflow-hidden">
              <Descriptions title="" layout="vertical" bordered labelStyle="">
                <Descriptions.Item label="Earnings" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>
              <Descriptions title="" bordered>
                <Descriptions.Item label="Basic Pay" span={3} className="alignright">${totalBasicPay.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Bonus" span={3} className="alignright">${totalBonus.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="OT Pay" span={3} className="alignright">${totalOTpay.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Total" span={3} className="alignright total">${totalEarnings.toFixed(2)}</Descriptions.Item>
              </Descriptions>

              <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="Claims" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>

              <Descriptions title="" bordered>
                 {Object.keys(claimsData).map((claim) =>
                  <Descriptions.Item label={claimsData[claim].claimDescription} span={3} className="alignright">
                    ${claimsData[claim].claimAmt.toFixed(2)}
                  </Descriptions.Item>
                  )}  
                <Descriptions.Item label="Total" span={3} className="alignright total">${totalClaims.toFixed(2)}</Descriptions.Item>
              </Descriptions>

              <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="Deductions" span={3} className="headerrow"></Descriptions.Item>
              </Descriptions>            
              <Descriptions title="" bordered>
                <Descriptions.Item label="CPF Contribution" span={3} className="alignright">-${totalCPF.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Tax Deductions" span={3} className="alignright">-${totalTax.toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Total" span={3} className="alignright total">-${totalDeductions.toFixed(2)}</Descriptions.Item>
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
    </div>
  );
};

export default Payslip;