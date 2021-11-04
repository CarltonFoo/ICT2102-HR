import React from "react";
import ReactDOM from "react-dom";
import useStyles from "./homeStyle";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { Button } from "antd";

const Home = () => {
  const classes = useStyles();

  return (
    <div className="md:w-1/2 mx-auto">
      Home
      <Button type="primary">AntD Button</Button>;
    </div>
  );
};

export default Home;
