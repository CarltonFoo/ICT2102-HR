import React, { Component } from "react";
import ReactDOM from "react-dom";
import useStyles from "./availabilityStyle";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { Layout } from "antd";
import { Table, Button, Space } from "antd";
import StaffAvailability from "../../data/staffAvailability.json";
import Sort, { Sorter } from "../utils/sorter";

const { Header, Content, Footer, Sider } = Layout;

class Availability extends Component {
  // const classes = useStyles();
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

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
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
      },
      {
        title: "Covering Person",
        dataIndex: "coveringPerson",
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
          <p class="text-2xl font-bold my-6">Staff Availability</p>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={this.setNameSort}>Sort Name</Button>
            <Button>Sort Availabilit</Button>
            <Button>Sort Department</Button>
            <Button>Clear filters</Button>
          </Space>
          <Table columns={sortableColumns} dataSource={StaffAvailability} />
        </div>
      </div>
    );
  }
}

export default Availability;
