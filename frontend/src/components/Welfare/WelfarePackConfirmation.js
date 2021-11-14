import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button, Form, Divider } from "antd";
import Table from "rc-table/lib/Table";
import LoginImg from "../../assets/images/login.png";

import { GiftOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

const WelfarePackConfirmation = (props) => {
  console.log("cfm", props);
  return (
    <div>
      <div>
        <h2 class="text-center text-3xl font-semibold mt-12 pt-6">
          Great! Everything is ready.
        </h2>
        <p class="text-center  text-blue-800 ">
          Thank you for spreading some love!
        </p>
      </div>
      <Divider />
      <div class="flex justify-evenly">
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <GiftOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Package Name </h3>
            <p>{props.welfarepack} </p>
          </div>
        </div>
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <UserOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Receiver </h3>
            <p>{props.receiver} </p>
          </div>
        </div>
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <HomeOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Receiver Department</h3>
            <p>{props.department} </p>
          </div>
        </div>
      </div>
      <div>
        <div class="text-center  pt-12  ">
          <h3 class="text-gray-400">Message </h3>
          <p class="">{props.message.value} </p>
        </div>
      </div>
      <div>
        <div class="flex justify-evenly mt-48">
          <Button type="primary" onClick={props.prev}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </div>
      </div>
      {/* 
        <div class=" text-blue-800 text-lg">
          <p>Department </p>
        </div> */}
      {/* <table class="table-auto  border border-collapse border-green-800 block">
        <thead>
          <tr>
            <td colspan="2" class="text-center">
              Confirmation
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-blue-300">
            <td>You have chosen: </td>
            <td>{props.welfarepack} </td>
          </tr>
          <tr class="bg-blue-200">
            <td>Total credits to be deducted: </td>
            <td>{props.credits}</td>
          </tr>
          <tr class="bg-blue-300">
            <td>Sendiing to: </td>
            <td>
              {" "}
              {props.receiver} from {props.department}
            </td>
          </tr>
          <td colspan="2" class="w-full bg-blue-200">
            Message:
          </td>
          <tr>{props.message.value}</tr>
        </tbody>
      </table> */}
      {/* <div>
        <div class="flex">
          <Button type="primary" onClick={props.prev}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default WelfarePackConfirmation;
