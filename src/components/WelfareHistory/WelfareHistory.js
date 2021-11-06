import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./welfareHistoryStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import {Popconfirm, Tag, Table, Button, Card, Col, Row } from "antd";
import historydata from "../../data/gifthistory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";

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
    title: "Status",
    dataIndex: "status",
    key: 'status',
    render: status => (
      <><Tag color='blue' key={status}>
        {status.toUpperCase()}
      </Tag>
      <Popconfirm title="Sure to delete?">
      {/* <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}> */}
          <a>:</a>
        </Popconfirm></>
    ),
    // render: tags => (
    //   <>
    //     {tags.map(tag => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),

  },
];

const WelfareHistory = () => {
  const classes = useStyles();
  const gridStyle = {
    // width: '25%',
    textAlign: 'center',
  };

  return (
    <div>
      <div class="m-auto w-11/12">
        <p class="text-2xl font-bold my-6">Welfare Gift History</p>
        <Table columns={columns} dataSource={historydata} />
      </div>
    </div>
  );
};

export default WelfareHistory;