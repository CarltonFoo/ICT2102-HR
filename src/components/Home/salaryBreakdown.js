// import React from "react";
import React, { Component } from "react";
import {Card} from "antd";
import { Link } from "react-router-dom";

import { EyeFilled, EyeInvisibleOutlined } from '@ant-design/icons';
import PayslipJSON from "../../data/payslip.json";
import { Pie } from '@ant-design/charts';
import moment from 'moment';

var linkStyle = {
    position: 'absolute',
    bottom: 10,
    right: 10
}

var totalOverall = 0;

var piedata = [
    {
    type: 'Base Pay',
    value: 0,
    },
    {
    type: 'Bonus Pay',
    value: 0,
    },
    {
    type: 'OT Pay',
    value: 0,
    },
    {
    type: 'Claims',
    value: 0,
    },
    {
    type: 'CPF',
    value: 0,
    },
    {
    type: 'Tax',
    value: 0,
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
        isActive: false,
    };

    handleShow = () => {
        this.setState({ isActive: true });
    };

    handleHide = () => {
        this.setState({ isActive: false });
    };

    componentDidMount() {
        var userSess, userData, month, claimsData, totalBasicPay, totalBonus, totalOTpay, totalCPF, totalTax, claim, totalClaims, totalEarnings, totalDeductions;

        userSess = JSON.parse(sessionStorage.getItem("user"))
        userData = PayslipJSON[0][userSess.username]

        month = moment().subtract(1, 'month').format('YYYY-MM')
        claimsData = []
        totalClaims = 0
        totalBasicPay = userData.months[month].earnings.basicPay
        totalBonus = userData.months[month].earnings.bonus
        totalOTpay = userData.months[month].earnings.OTpay
        totalCPF = userData.months[month].deductions.CPFcontribution
        totalTax = userData.months[month].deductions.taxDeduction
        for (claim in userData.months[month].claims) {
            totalClaims += userData.months[month].claims[claim].claimAmt
            claimsData.push(userData.months[month].claims[claim])
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

        hideConfig = {
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

        // Trigger update
        this.setState({ foo: !this.state.foo });
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default salaryBreakdown;