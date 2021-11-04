import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./availabilityStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import TopNavbar from "../Navbar/TopNavBar";

const { Header, Content, Footer, Sider } = Layout;

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
            <p class="text-2xl font-bold m-88">Staff Availability</p>
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