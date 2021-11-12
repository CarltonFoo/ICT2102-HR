// import React from "react";
import React, { Component } from "react";
import { Table, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

import { EyeFilled, EyeInvisibleOutlined } from '@ant-design/icons';
import PayslipJSON from "../../data/payslip.json";
import { Pie } from '@ant-design/charts';
import moment from 'moment';

var linkStyle = {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginBottom: 10
}

var month = moment().subtract(1, 'month').format('YYYY-MM')
var claimsData = []
var totalClaims = 0
var totalBasicPay = PayslipJSON[0].months[month].earnings.basicPay
var totalBonus = PayslipJSON[0].months[month].earnings.bonus
var totalOTpay = PayslipJSON[0].months[month].earnings.OTpay
var totalCPF = PayslipJSON[0].months[month].deductions.CPFcontribution
var totalTax = PayslipJSON[0].months[month].deductions.taxDeduction
for (var claim in PayslipJSON[0].months[month].claims) {
    totalClaims += PayslipJSON[0].months[month].claims[claim].claimAmt
    claimsData.push(PayslipJSON[0].months[month].claims[claim])
}
var totalEarnings = totalBasicPay + totalBonus + totalOTpay;
var totalDeductions = totalCPF + totalTax;
var totalOverall = totalEarnings + totalClaims - totalDeductions;

var piedata = [
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

var hideConfig = {
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
        content: '{name}',
        style: {
            fontSize: 12,
            textAlign: 'center',
        },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
};


class salaryBreakdown extends Component {
    state = {
        isActive: false
    };

    handleShow = () => {
        this.setState({ isActive: true });
    };

    handleHide = () => {
        this.setState({ isActive: false });
    };

    render() {
        return (
            <div>
                {PayslipJSON && PayslipJSON.length > 0 && PayslipJSON.map((data) =>
                    <div>
                        {this.state.isActive ? (
                            <Card
                                style={{ marginTop: 16, height: 520 }}
                                type="inner"
                                title= "Salary Breakdown"
                                extra={<EyeFilled onClick={this.handleHide} data-tip="Click to hide total salary" style={{ cursor: 'pointer' }} />}
                            >
                                <Pie {...config} />
                                <div class="p-6 font-bold text-center">
                                    Total: ${totalOverall.toFixed(2)}
                                </div>
                                <Link to="/payslip" style={linkStyle}>View Full Summary &#62;</Link>
                            </Card>
                        ) : (
                            <Card
                                style={{ marginTop: 16, height: 520 }}
                                type="inner"
                                title="Salary Breakdown"
                                extra={<EyeInvisibleOutlined onClick={this.handleShow} data-tip="Click to show total salary" style={{ cursor: 'pointer' }} />}
                            >
                                <Pie {...hideConfig} />
                                <div class="p-6 font-bold text-center">
                                    Total: $****
                                </div>

                                <Link to="/payslip" style={linkStyle}>View Full Summary &#62;</Link>
                            </Card>

                        )}
                    </div>

                )}
            </div>
        )
    }
}

export default salaryBreakdown;