// import React from "react";
import React, { Component } from "react";
import { Table, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

import { EyeFilled, EyeInvisibleOutlined } from '@ant-design/icons';
import PayslipJSON from "../../data/payslip.json";
import { Pie } from '@ant-design/charts';

var linkStyle = {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginBottom: 10
}

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