import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Tooltip, Button, Steps } from "antd";
import {
  InfoCircleTwoTone,
  SmileTwoTone,
  DollarCircleFilled,
  HistoryOutlined,
} from "@ant-design/icons";
import WelfareForm from "./WelfarePackForm";
import WelfarePackConfirmation from "./WelfarePackConfirmation";
import "./welfare.css";

const Welfare = () => {
  return (
    <div class="m-auto w-11/12 ">
      <div>
        <p class="text-2xl font-bold my-6">
          Send a Welfare Pack
          <div data-tip="Quick selection of welfare packages" class="inline">
            <InfoCircleTwoTone
              style={{ fontSize: "18px" }}
              twoToneColor="#A3A989"
              class="inline-block"
              className={"px-4"}
            />
            <ReactTooltip place="right" effect="solid" />
          </div>
        </p>

        <div class="welfareformh">
          <WelfareForm />
        </div>
      </div>
    </div>
  );
};

export default Welfare;
