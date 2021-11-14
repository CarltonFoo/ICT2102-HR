import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import StaffAvailability from "../../data/staffAvailability.json";
import Sort, { Sorter } from "../utils/sorter";
import { Table, Card, Row, Layout } from "antd";


const { Header, Content, Footer, Sider } = Layout;

var linkStyle = {
    position: 'absolute',
    bottom: 10,
    right: 10
  }

class Availability extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
                sorter: {
                    compare: Sorter.NAME,
                },
            },
            {
                title: "Position",
                dataIndex: "position",
                // filters: Filter({
                //   StaffAvailability.map((employee) => (
                //    employee.position
                // ))}),
                filters: [
                    {
                        text: "UXUI Designer",
                        value: "UXUI Designer",
                    },
                    {
                        text: "Process Manager",
                        value: "Process Manager",
                    },
                ],

                onFilter: (value, record) => record.position.indexOf(value) === 0,

                // filters: Filter(StaffAvailability)((employee) => employee.position),
            },
            {
                title: "Leave Start Date",
                dataIndex: "leaveStartDate",
                sorter: {
                    compare: Sorter.DATE,
                },
            },
            {
                title: "Leave End Date",
                dataIndex: "leaveEndDate",
                sorter: {
                    compare: Sorter.DATE,
                },
            },
            {
                title: "Leave Type",
                dataIndex: "leaveType",
                filters: [
                    {
                        text: "Annual",
                        value: "Annual",
                    },
                    {
                        text: "Sick",
                        value: "Sick",
                    },
                    {
                        text: "Maternity",
                        value: "Maternity",
                    },
                    {
                        text: "Bereavement",
                        value: "Bereavement",
                    },
                    {
                        text: "Unpaid",
                        value: "Unpaid",
                    },
                ],
                onFilter: (value, record) => record.leaveType.indexOf(value) === 0,
            },
            {
                title: "Covering Person",
                dataIndex: "coveringPerson",
                sorter: {
                    compare: Sorter.NAME,
                },
            },
        ];
        const sortableColumns = columns.map((column) => {
            const { sorter, dataIndex, ...otherColumnProps } = column;

            if (sorter) {
                const { compare, ...otherSorterProps } = sorter;

                return {
                    ...otherColumnProps,
                    dataIndex,
                    sorter: {
                        compare: (rowA, rowB) => compare(rowA[dataIndex], rowB[dataIndex]),
                        ...otherSorterProps,
                    },
                };
            }

            return { ...otherColumnProps, dataIndex };
        });
        return (
            <div>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="Staff Availability"
                >
                    <Table
                        style={{ marginBottom: 20 }}
                        pagination={false}
                        columns={sortableColumns}
                        dataSource={StaffAvailability.slice(5, 10)}
                        onChange={this.handleChange}
                    />
                    <Row>
                        <Link to="/availability" style={linkStyle}>
                            View All Staff Availability &#62;
                        </Link>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default Availability;
