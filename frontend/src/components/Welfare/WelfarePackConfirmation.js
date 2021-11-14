import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button, Form } from "antd";
import Table from "rc-table/lib/Table";

const WelfarePackConfirmation = (props) => {
  console.log("cfm", props);
  return (
    <div class=" flex py-8 place-content-center">
      <Form class="">
        <table class="table-auto  border border-collapse border-green-800 block">
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
        </table>
        <div>
          <Form.Item class="text-center py-8  flex-inline space-x-4 grid grid-cols-2 gap-4">
            <div>
              <Button type="primary" onClick={props.prev}>
                Back
              </Button>
            </div>
            <div>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </div>
          </Form.Item>
          <Form.Item class="text-center">
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default WelfarePackConfirmation;
