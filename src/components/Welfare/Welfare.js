import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Tooltip, Button, Steps } from "antd";
import { InfoCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import WelfarePackSelection from "./WelfarePackSelection";
import WelfareForm from "./WelfarePackForm";
import WelfarePackConfirmation from "./WelfarePackComfirmation";
import { StepPanel } from "./StepPanel";
import "./welfare.css";

const { Step } = Steps;
const Welfare = () => {
  return (
    <div class="m-auto w-11/12">
      <div>
        <p class="text-2xl font-bold my-6">
          Send a Welfare Pack
          {/* Need to add hover styling and tooltip*/}
          <InfoCircleTwoTone
            style={{
              marginLeft: "1em",
              display: "inline-flex",
              fontSize: "100%",
            }}
          />
        </p>
        <SmileTwoTone
          style={{
            display: "inline-flex",
            fontSize: "120%",
            marginRight: "1em",
          }}
        />
        Hello there! Spread some love to your fellow peers by gifting them
        welfare packs
      </div>
      <div>
        <WelfareForm />
      </div>
    </div>
  );
};

export default Welfare;
