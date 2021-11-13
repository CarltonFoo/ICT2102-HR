import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button } from "antd";
import { StepPanel } from "./StepPanel";

const WelfarePackConfirmation = (props) => {
  console.log("cfm", props)
  return (
    <div>Confirmation
      
    <div>{props.receiver}</div>
    
    <div>{props.message.value}</div>
    
    <div>{props.department}</div>

    <div>{props.welfarepack}</div>
    
    </div>
  );
};

export default WelfarePackConfirmation;
