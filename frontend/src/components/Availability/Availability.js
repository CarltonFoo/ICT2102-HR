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
      <Layout>
        <Content>
          <p class="text-2xl font-bold">Staff Availability</p>
        </Content>
      </Layout>
    </div>
  );
};

export default Availability;