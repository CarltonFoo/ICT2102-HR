import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button } from "antd";

const WelfarePackConfirmation = (props) => {
  console.log("cfm", props);
  return (
    <div>
      <p>Confirmation</p>
      <div class="grid grid-cols-3 gap-4">
        <p>You have chosen: </p>
        <div>{props.welfarepack}</div>
        <div> Total credits to be deducted: </div>
        <div> 50 </div>
        <div> Sending to:</div>
        <div>{props.receiver}</div>

        <div>{props.message.value}</div>
        <div>{props.department}</div>
        <div>{props.credits}</div>
      </div>
    </div>
  );
};

export default WelfarePackConfirmation;
