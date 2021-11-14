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

const { Step } = Steps;
const Welfare = () => {
  return (
    <div class="m-auto w-11/12">
      <div>
      <div class="text-2xl font-bold my-6">
      Send a Welfare Pack          
          <div data-tip="You will have 200 credits each quarter. It will be deducted automatically." class="inline">
            <InfoCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#A3A989" class="inline-block" className={"px-4"} />
          </div>
          <ReactTooltip place="right" effect="solid" />
          </div>
        <SmileTwoTone
          style={{
            display: "inline-flex",
            fontSize: "120%",
            marginRight: "1em",
          }}
        />
        Hello there! Spread some love to your fellow peers by gifting them
        welfare packs
        <div class=" mt- 10  pl-96 ml-96">
          <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
            <DollarCircleFilled style={{ display: "inline-flex" }} /> Credits
          </Button>
        </div>
        <div class="mt-1 pl-96 ml-96 ">
          <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <HistoryOutlined style={{ display: "inline-flex" }} /> Welfare
            History
          </Button>
        </div>
        {/* </div> */}
      </div>
      <div class="welfareformh">
        <WelfareForm />
      </div>
    </div>
  );
};

export default Welfare;
