import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
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
const TopNavbar = (props) => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  //Log Out
  let history = useHistory();

  const handleLogout = () => {
    history.push("/login");
    sessionStorage.clear();
    window.location.reload();
    
  };

  return (
    <div>
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
              <div>Notifcations</div>
            </Menu.Item>
            <Menu.Item key="3" class="text-white">
              <button onClick={handleLogout}>Log Out</button>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    </div>
  );
};

export default TopNavbar;
