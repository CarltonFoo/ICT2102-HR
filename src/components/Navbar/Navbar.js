import React from "react";
import ReactDOM from 'react-dom';
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

import "./navbar.css"
import TopNavbar from "../Navbar/TopNavBar.js";
import Card from "../Shared/Card";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Navbar = (props) => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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
            collapsible
            className="fullh site-layout-background"
            width={250}
            class="h-screen"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["home"]}
              defaultOpenKeys={["home"]}
              style={{ height: "100%" }}
            >
              <div class="p-6">
                <h2 class="font-bold text-xl">Jenny Chan</h2>
                <p class="font-semibold text-lg">Software Engineer</p>
              </div>
              <Menu.Item key="home" icon={<HomeOutlined />}>
                Dashboard
                <Link to='/' />
              </Menu.Item>
              <Menu.Item key="welfare" icon={<GiftOutlined />}>
                Welfare
                <Link to='/welfare' />
              </Menu.Item>
              <Menu.Item key="payslip" icon={<DollarOutlined />}>
                Payslip
                <Link to='payslip' />
              </Menu.Item>
              <Menu.Item key="availability" icon={<UserSwitchOutlined />}>
                Availability
                <Link to='/availability' />
              </Menu.Item>
              <Menu.Item key="history" icon={<HistoryOutlined />}>
                Welfare History
                <Link to='/history' />
              </Menu.Item>
              <SubMenu title="Manage(FOR HR VIEW)" icon={<AppstoreOutlined />}>
                <Menu.Item key="welfareinventory" icon={<AppstoreAddOutlined />}>Welfare Inventory
                <Link to='/inventory' />
                </Menu.Item>
                <Menu.Item key="welfareapproval" icon={<FileDoneOutlined />}>Welfare Approval
                <Link to='/approval' />
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="login" icon={<LoginOutlined />}>
                Login (temp)
                <Link to='/login' />
              </Menu.Item>
            </Menu>
          </Sider>

          <Content>
            <Card>
              {props.children}
            </Card>
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