import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SmileTwoTone,
  NotificationFilled,
  BellFilled,
  HomeOutlined,
  UserSwitchOutlined,
  DollarOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  GiftOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { MenuItem } from "rc-menu";

import "./navbar.css";
import TopNavbar from "../Navbar/TopNavBar.js";
import Card from "../Shared/Card";
import users from "../../data/employees.json";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Navbar = (props) => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const user = JSON.parse(sessionStorage.getItem("user"));

  const getName = (usersData) => {
    for (let i = 0; i < usersData.length; i++) {
      if (user?.username === usersData[i].username) {
        return <p>{usersData[i].employeeName}</p>;
      }
    }
  };

  const getPosition = (usersData) => {
    for (let i = 0; i < usersData.length; i++) {
      if (user?.username === usersData[i].username) {
        return <p>{usersData[i].position}</p>;
      }
    }
  };

  return (
    <div class="h-screen">
      <Layout>
        <Header className="header" class="w-screen">
          <TopNavbar></TopNavbar>
        </Header>
        <Layout class="h-screen">
          <Sider
            className="fullh site-layout-background"
            width={250}
            class="h-screen"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <div class="p-6 ">
                <div>
                  <h3 className="font-bold  text-lg">{getName(users)} </h3>
                  <p class="font-semibold pt-2"> {getPosition(users)}</p>
                </div>
              </div>
              <MenuItem key="/" icon={<UserOutlined />}>
                Dashboard
                <Link to="/" />
              </MenuItem>
              <MenuItem key="/welfare" icon={<UserOutlined />}>
                Welfare
                <Link to="/welfare" />
              </MenuItem>
              <MenuItem key="/payslip" icon={<UserOutlined />}>
                Payslip
                <Link to="/payslip" />
              </MenuItem>
              <MenuItem key="/availability" icon={<UserOutlined />}>
                Availability
                <Link to="/availability" />
              </MenuItem>
              <MenuItem key="/history" icon={<UserOutlined />}>
                Welfare History
                <Link to='/history' />
              </Menu.Item>
              <SubMenu title="Manage(FOR HR VIEW)" icon={<AppstoreOutlined />}>
                <Menu.Item
                  key="welfareinventory"
                  icon={<AppstoreAddOutlined />}
                >
                  Welfare Inventory
                  <Link to="/inventory" />
                </Menu.Item>
                <Menu.Item key="welfareapproval" icon={<FileDoneOutlined />}>
                  Welfare Approval
                  <Link to="/approval" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Content>
            <Card>{props.children}</Card>
          </Content>
        </Layout>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </div>
  );
};

export default Navbar;
