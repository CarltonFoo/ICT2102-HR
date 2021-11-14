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
      <div class="grid grid-cols-2  gap-4">
        <p>You have chosen: </p>
        <div>{props.welfarepack}</div>
        <p> Total credits to be deducted: </p>
        <div>{props.credits} </div>
        <p> Sending to:</p>
        <div>
          {props.receiver} from {props.department}
        </div>
        <p> Message: </p>
        <div>{props.message.value}</div>
      </div>
    </div>
  );
};

export default WelfarePackConfirmation;
