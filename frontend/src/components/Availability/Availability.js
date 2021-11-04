import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./availabilityStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Layout } from "antd";
const { Content } = Layout;

const Availability = () => {
  const classes = useStyles();

  return (
    <div>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          hello
        </Content>
      </Layout>
    </div>
  );
};

export default Availability;