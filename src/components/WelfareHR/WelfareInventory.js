import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./welfareHistoryStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import {Tag, Table, Button, Card, Col, Row } from "antd";
import inventoryData from "../../data/inventory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "In Stock",
    dataIndex: "instock",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Stock Status",
    dataIndex: "status",
    key: 'status',
    render: status => (
            <Tag color='blue' key={status}>
              {status.toUpperCase()}
            </Tag>
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
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={true} style={gridStyle}><b>Most Popular Item</b><br></br>Morning Blues</Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} style={gridStyle}><b>Running out of Items</b><br></br>TGIF!</Card>
          </Col>
        </Row>
      </div>
      <div class="m-auto w-11/12">
        <p class="text-2xl font-bold my-6">Welfare Inventory</p>
        <Table columns={columns} dataSource={inventoryData}/>
      </div>
    </div>
  );
};

export default WelfareHistory;