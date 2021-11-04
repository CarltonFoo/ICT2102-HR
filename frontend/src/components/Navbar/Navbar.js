import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./navbarStyle";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../../assets/css/navbar.css";
import employees from "../../data/employees.json";
import { MenuItem } from "rc-menu";
import { BellFilled } from "@ant-design/icons";

const { SubMenu } = Menu;

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
    <div>
      <div class=" max-screen h-16 mx-auto  bg-blue-800">
        <div class="flex pt-4 justify-between">
          <h2 class="text-2xl text-white font-bold pl-12 ">WorkDay</h2>
          <div class="mr-10 pt-2">
            <BellFilled style={{ fontSize: "1.5rem", color: "#ffffff" }} />
          </div>
        </div>
      </div>
      <div class=" w-64 bg-white   h-screen">
        <div class="p-6 ">
          <h2 class="font-bold text-xl">Jenny Chan</h2>
          <p class="font-semibold text-lg">Software Engineer</p>
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          title="Navigation One"
        >
          <MenuItem key="sub1" icon={<MailOutlined />}>
            <a href="/dashboard"> Dashboard</a>
          </MenuItem>
          <MenuItem key="sub2" icon={<MailOutlined />}>
            <a href="/schedule"> Schedule</a>
          </MenuItem>
          <MenuItem key="sub3" icon={<MailOutlined />}>
            <a href="/leaves"> Leaves</a>
          </MenuItem>
          <MenuItem key="sub4" icon={<MailOutlined />}>
            <a href="/payslip"> Payslip</a>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;