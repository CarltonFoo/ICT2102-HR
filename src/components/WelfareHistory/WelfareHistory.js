import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Tooltip, Popover, Tag, Table, Button, Card, Col, Row } from "antd";
import historydata from "../../data/gifthistory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import { InfoCircleOutlined, EyeFilled } from '@ant-design/icons';

const columns = [
  {
    title: "Date Requested",
    dataIndex: "date",
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
  },
  {
    // title: "Status",
    title: () => {
      const text = <><p>"Pending Approval" - Waiting on HR approval</p>
      <p>“Approved” - HR approved, preparing to send out</p>
      <p>“Sent out” - Welfare Package had been dispatched</p></> ;
      return (
        <>
      Status
      <Tooltip placement="top" title={text}>
        <InfoCircleOutlined style={{fontSize:'16px',position:'relative',left:'3px',bottom:'3px'}}>Top</InfoCircleOutlined>

      </Tooltip>
        </>
      )
    },
    dataIndex: "status",
    key: 'status',
    render(status) {
      let color = "blue";
      switch(status) {
        case "Pending Approval":
          color = "orange"
          break;
        case "Approved":
          color = "green"
          break;
        case "Sent out":
          color = "blue"
          break;
        default:
          color = "blue"
      }
      return (
        <>
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
          <Popover
            content={<>
              <a onClick="">Edit Message</a><br></br>
              <a onClick="">Change Delivery Date</a><br></br>
              <a onClick="">View Details</a><br></br>
              <a onClick="">Cancel Order</a>
            </>}
            trigger="click"
          >
            <Button type="text">:</Button>
          </Popover>
        </>
      );

    }
  },
];

const WelfareHistory = () => {
  const gridStyle = {
    // width: '25%',
    textAlign: 'center',
  };

  return (
    <div>
      <div class="m-auto w-11/12">
        <p class="text-2xl font-bold my-6">Welfare Gift History</p>
        <Table columns={columns} dataSource={historydata} pagination={{pageSize:5}} />
      </div>
    </div>
  );
};

export default WelfareHistory;