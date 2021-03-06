import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { Layout } from "antd";
import { Table, Button, Space } from "antd";
import StaffAvailability from "../../data/staffAvailability.json";
import Sort, { Sorter } from "../utils/sorter";
import Filter from "../utils/filter";
import { InfoCircleTwoTone } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

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
          {
            text: "Business Analytics Manager",
            value: "Business Analytics Manager",
          },
          {
            text: "Software Engineer",
            value: "Software Engineer",
          },
          {
            text: "HR Manager",
            value: "HR Manager",
          },
        ],

        onFilter: (value, record) => record.position.indexOf(value) === 0,
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
        <div class="m-auto w-11/12">
          <div class="text-2xl font-bold my-6">
            Staff Availability
            <div data-tip="Check your fellow staff availability" class="inline">
              <InfoCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#A3A989" class="inline-block" className={"px-4"} />
            </div>
            <ReactTooltip place="right" effect="solid" />
          </div>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </Space>
          <Table
            columns={sortableColumns}
            dataSource={StaffAvailability}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Availability;
