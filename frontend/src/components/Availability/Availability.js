import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./availabilityStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import TopNavbar from "../Navbar/TopNavBar";
import { Table, Button, Space } from "antd";
import StaffAvailability from "../../data/staffAvailability.json";
import Card from "../Shared/Card";
const { Header, Content, Footer, Sider } = Layout;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Leave Start Date",
    dataIndex: "leaveStartDate",
  },
  {
    title: "Leave End Date",
    dataIndex: "leaveEndDate",
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

const Availability = () => {
  const classes = useStyles();

  return (
    <div>
      <Layout>
        <Header className="header" class="w-screen">
          <TopNavbar></TopNavbar>
        </Header>
        <Layout class="h-screen">
          <Sider
            className="site-layout-background"
            width={250}
            class="h-screen"
          >
            <Navbar></Navbar>
          </Sider>
          <Content>
            <p class="text-2xl font-bold p-12">Staff Availability</p>
            <div class="m-auto w-8/12">
              <Card>
                <Space style={{ marginBottom: 16 }}>
                  <Button>Sort Name</Button>
                  <Button>Sort Availabilit</Button>
                  <Button>Sort Department</Button>
                  <Button>Clear filters</Button>
                </Space>
                <Table columns={columns} dataSource={StaffAvailability} />
              </Card>
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default Availability;