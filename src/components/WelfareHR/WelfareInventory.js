import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./welfareInventoryStyle";
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
    render(status) {
      let color = "blue";
      switch(status) {
        case "In Stock":
          color = "green"
          break;
        case "Low Stock":
          color = "yellow"
          break;
        case "Critically Low":
          color = "orange"
          break;
        case "Out of Stock":
          color = "red"
          break;
        default:
          color = "blue"
      }
      return (
        <>
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      );

    }
    
  },
];

const WelfareInventory = () => {
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
        <Table columns={columns} dataSource={inventoryData} pagination={{pageSize:5}}/>
      </div>
    </div>
  );
};

export default WelfareInventory;