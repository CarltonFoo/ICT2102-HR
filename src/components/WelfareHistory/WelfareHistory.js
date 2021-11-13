import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Space,Popconfirm,Form,Input,Tooltip, Popover, Tag, Table, Button, Card, Col, Row } from "antd";
import historydata from "../../data/gifthistory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import { InfoCircleOutlined, EyeFilled } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
/*Library*/
const EditableContext = React.createContext(null);


class WelfareHistory extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      dataSource: historydata,
      searchText: '',
      searchedColumn: '',
    };
    
    this.columns = [
      {
        title: "Date Requested",
        dataIndex: "date",
        ...this.getColumnSearchProps('date'),
      },
      {
        title: "Recipient",
        dataIndex: "receiver",
      },
      {
        title: "Department",
        dataIndex: "department",
      },
      {
        title: "Product Name",
        dataIndex: "productname",
      },
      {
        title: "Delivery",
        dataIndex: "delivery",
        // editable: true,
      },
      {
        // title: "Status",
        //tooltip
        title: () => {
          const text = (
            <>
              <p>"Pending Approval" - Waiting on HR approval</p>
              <p>“Approved” - HR approved, preparing to send out</p>
              <p>“Sent out” - Welfare Package had been dispatched</p>
            </>
          );
          return (
            <>
              Status
              <Tooltip placement="top" title={text}>
                <InfoCircleOutlined
                  style={{
                    fontSize: "16px",
                    position: "relative",
                    left: "3px",
                    bottom: "",
                  }}
                >
                  Top
                </InfoCircleOutlined>
              </Tooltip>
            </>
          );
        },
        dataIndex: "status",
        key: "status",

        render(status, record) {
          let color = "blue";
          switch (status) {
            case "Pending Approval":
              color = "orange";
              break;
            case "Approved":
              color = "green";
              break;
            case "Sent out":
              color = "blue";
              break;
            default:
              color = "blue";
          }

          return (
            <>
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
              <Popover
                content={
                  <>
                    <a onClick="">Edit Message</a>
                    <br></br>
                    <a onClick="">View Details</a>
                    <br></br>
                  </>
                }
                trigger="click"
              >
                <Button type="text">:</Button>
              </Popover>
            </>
          );
        },
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined style={{
              // fontSize: "16px",
              position: "relative",
              bottom: "3px",
            }}/>}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     date: "date",
  //     receiver: "receiver",
  //     department: "department",
  //     productname: "name",
  //     delivery: "delivery",
  //     status: "Approved",
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };
  // handleSave = (row) => {
  //   const newData = [...this.state.dataSource];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   this.setState({
  //     dataSource: newData,
  //   });
  // };

  render() {
    const { dataSource } = this.state;
    const components = {
      // body: {
      //   row: EditableRow,
      //   cell: EditableCell,
      // },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      // return {
      //   ...col,
      //   onCell: (record) => ({
      //     record,
      //     editable: col.editable,
      //     dataIndex: col.dataIndex,
      //     title: col.title,
      //     handleSave: this.handleSave,
      //   }),
      // };
    });
    return (
      // <div>
      //   <Button
      //     onClick={this.handleAdd}
      //     type="primary"
      //     style={{
      //       marginBottom: 16,
      //     }}
      //   >
      //     Add a row
      //   </Button>
        <Table
          pagination={{ pageSize: 5 }}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      // </div>
    );
  }
}


export default WelfareHistory;