import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Space, Popconfirm, Form, Input, Tooltip, Popover, Tag, Table, Button } from "antd";
import historydata from "../../data/gifthistory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import { InfoCircleOutlined, EyeFilled } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { thisExpression } from '@babel/types';
const { TextArea } = Input;
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
      visible: false,
      visibleEdit: false,
      recordData: null,
      recordMsg: null,
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

              {/* <Popover
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
              </Popover> */}
            </>
          );
        },
      },
      {
        title: "Info",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              {/* <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm> */}
              <Popover
                content={
                  <>
                    <a onClick={() => this.handleDelete(record.key)}>Cancel Order</a>
                    <br></br>
                    <a onClick={() => this.show(record)}>View Details</a>
                    <br></br>
                    <a onClick={() => this.showEdit(record)}>Edit Message</a>
                    <br></br>
                  </>
                }
                trigger="click"
              >
                <a>Manage</a>
              </Popover>
            </>
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
            }} />}
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
  getPackageInfo = () => {
    if (this.state.recordData !== null) {
      const recordData = this.state.recordData;
      // console.log(recordData);
      // const dataSource = [...this.state.dataSource];
      var dataSource = this.state.dataSource;
      // console.log(dataSource);
      var giftText = ""
      giftText =
        recordData.productname + " for " + recordData.receiver +
        " (" + recordData.department + ")" + '\n' +
        "Date Ordered: " + recordData.date + '\n' +
        "Department : " + recordData.department + '\n' +
        "Date to Deliver: " + recordData.delivery + '\n' +
        "Status : " + recordData.status + '\n' +
        "Message : " + recordData.message + '\n';
      return giftText;
    }
  }
  handleMessageChange = (event) => {
    this.setState({ recordMsg: event.target.value })
  }
  updateJSONmsg = () => {
    //update JSON MESSAGE HERE
    var dataSource = this.state.dataSource;
    // console.log("handlemsgchange,recMSG", this.state.recordMsg)
    // console.log("updateJSON recordData \n",this.state.recordData);
    for (var i = 0; i < dataSource.length; i++) {
      if(this.state.recordData === dataSource[i]){
        // console.log("FOUND,gift message:",dataSource[i].message);
        dataSource[i].message = this.state.recordMsg;
        this.setState({
          dataSource: dataSource
        })
      }
      // console.log("updateJSON datasource \n", dataSource[i]);
    }
  }

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
  hide = () => {
    this.setState({
      visible: false,
      visibleEdit: false,
    });
    // this.setState({
    //   recordData: null,
    // })
  };
  show = (record) => {
    this.setState({
      visible: true,
      visibleEdit: false,
    })
    this.setState({
      recordData: record,
    })
    // console.log(record);
  }
  showEdit = (record) => {
    this.setState({
      visibleEdit: true,
      visible: false,
      recordMsg: record.message,
    })
    this.setState({
      recordData: record,
    })
    // console.log("message", this.state.recordMsg);
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  handleVisibilityEditChange = visibleEdit => {
    this.setState({ visibleEdit })
  }

  render() {
    const { dataSource } = this.state;
    const { visible } = this.state;
    const { visibleEdit } = this.state;
    const { recordData } = this.state;
    const { recordMsg } = this.state;
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
    });
    return (
      <div class="m-auto w-11/12">
        <Table
          pagination={{ pageSize: 5 }}
          components={components}

          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <Popover
          overlayInnerStyle={{
            textAlign: "center",
            whiteSpace: "pre-line",
            width: "40vw",
            height: "20vw",
          }}
          content={
            <>
              <p>{this.getPackageInfo()}</p>
              <Button
                type="primary"
                onClick={() => this.hide()}
                // style={{ top: "3vw" }}
              >
                Close
              </Button>
            </>
          }
          title={<b>Gift Details</b>}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button
            style={{ margin: "0 32vw" }}
            type="primary"
          >
          </Button>
        </Popover>

        <Popover
          overlayInnerStyle={{
            textAlign: "center",
            whiteSpace: "pre-line",
            width: "40vw",
            height: "20vw",
          }}
          content={
            <>
              <p class="font-bold text-center text-blue-800">Delivery Message</p>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={() => this.updateJSONmsg()}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item>
                  <TextArea rows={4}
                    value={this.state.recordMsg}
                    onChange={(e) => this.handleMessageChange(e)}
                  > </TextArea>
                </Form.Item>
                <Form.Item
                >
                  {/* <Button type="primary" htmlType="submit">
                    Submit
                  </Button> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.hide()}
                    // style={{ top: "3vw" }}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>


            </>
          }
          title={<b>Edit Message</b>}
          trigger="click"
          visible={this.state.visibleEdit}
          onVisibleChange={this.handleVisibilityEditChange}
        >
          <Button
            style={{ margin: "0 32vw", position: 'relative', top: '-30px' }}
            type="primary"
          >

          </Button>
        </Popover>

      </div>

    );
  }
}

export default WelfareHistory;