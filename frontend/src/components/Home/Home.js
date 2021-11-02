import React from "react";
import ReactDOM from 'react-dom';
import useStyles from "./homeStyle";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Button } from "antd";

const Home = () => {
  const classes = useStyles();

  return (
    <div class="m-auto">
      <p class="font-bold text-4xl">Home</p>
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default Home;