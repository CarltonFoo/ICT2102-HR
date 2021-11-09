import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import useStyles from "./welfareStyle";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button } from "antd";
import { StepPanel } from "./StepPanel";

const WelfarePackConfirmation = () => {
  // const { setStep, userData, setUserData, submitData } =
  //   useContext(multiStepContext);
  const classes = useStyles();

  return <div>Confirmation</div>;
};

export default WelfarePackConfirmation;
