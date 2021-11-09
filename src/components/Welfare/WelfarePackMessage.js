import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import useStyles from "./welfareStyle";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import Card from "../Shared/Card.js";
import { Col, Row, Avatar, Steps, Form, Select, Button, Input } from "antd";
import { multiStepContext } from "./StepPanel";
const { Option } = Select;
const { TextArea } = Input;

const WelfareMessage = () => {
  // const { setStep, userData, setUserData } = useContext(multiStepContext);
  const classes = useStyles();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 16,
        }}
      >
        <Row gutter={3}>
          <Col style={{ alignItems: "center" }}>
            <Form.Item
              name="department"
              rules={[
                {
                  required: true,
                  message: "Please select a Department",
                },
              ]}
            >
              <Select
                trigger={["hover"]}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a department"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="employee"
              rules={[
                {
                  required: true,
                  message: "Please select a Department",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select an employee"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="message"
        wrapperCol={{
          offset: 7,
          span: 16,
          alignItems: "center",
        }}
        rules={[
          {
            required: true,
            message: "Please enter a message",
          },
        ]}
      >
        <TextArea
          placeholder="Enter Message"
          allowClear
          autoSize={{ minRows: 3, maxRows: 5 }}
          style={{ width: 465 }}
        />
      </Form.Item>

      {/* <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default WelfareMessage;
