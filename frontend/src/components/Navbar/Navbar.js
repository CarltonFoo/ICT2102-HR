import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./navbarStyle";
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
} from "@ant-design/icons";
import { MenuItem } from "rc-menu";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const Navbar = () => {
  const classes = useStyles();
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
    <Layout class="">
      <Header className="header">
        <div class="flex justify-between">
          <div>
            <SmileTwoTone style={{ fontSize: "40px", color: "#08c" }} />
          </div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <SmileTwoTone />
            </Menu.Item>
            <Menu.Item key="2">
              <BellFilled />
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Layout class="h-screen">
        <Sider width={250} class="h-screen">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
          >
            <MenuItem key="sub1" icon={<UserOutlined />} title="subnav 1">
              <a href="/"> Dashboard</a>
            </MenuItem>
            <MenuItem key="sub2" icon={<UserOutlined />} title="subnav 2">
              <a href="/availability"> Schedule</a>
            </MenuItem>
            <MenuItem key="sub3" icon={<UserOutlined />} title="subnav 3">
              <a href="/payslip"> Payslip</a>
            </MenuItem>
            <MenuItem key="sub4" icon={<UserOutlined />} title="subnav 4">
              <a href="/welfare"> Welfare Gifting</a>
            </MenuItem>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Navbar;