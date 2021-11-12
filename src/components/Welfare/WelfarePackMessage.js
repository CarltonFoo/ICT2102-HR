import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import Card from "../Shared/Card.js";
import { Col, Row, Form, Select, Button, Input, message } from "antd";
import Employees from "../../data/employees.json";
import { _ } from "numeral";

const { Option } = Select;
const { TextArea } = Input;

const WelfareMessage = (props) => {
  // const [form] = Form.useForm();
  console.log("props", props)

  // const handleSubmit = (e) => {
  //   console.log("hi");
  //   e.preventDefault();
  //   console.log("Success:", e.target.value);
  // };

  // const handleNext = () => {
  //   console.log("handleNext");
  //   console.log(welfareData.department);
  //   console.log(welfareData.receiverName);
  //   console.log(welfareData.message);
  // };

  // const [welfareData, setWelfareData] = useState({
  //   department: "",
  //   receiverName: "",
  //   message: "",
  // });

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
      // onSubmit={handleSubmit}
      // form={form}
    >
      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 16,
        }}
      >
        <Row gutter={3}>
          <Col>
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
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(e) =>
                  props.onChange({
                    ...props.department,
                    department: e,
                  })
                }
              >
                {Employees.map((employee) => (
                  <Option value={employee.department}>
                    {employee.department}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="employee"
              rules={[
                {
                  required: true,
                  message: "Please select am Empolyee",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select an employee"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(e) =>
                  props.onChange({
                    ...props.receiver,
                    receiver: e,
                  })
                }
              >
                {Employees.map((employee) => (
                  <Option value={employee.employeeName}>
                    {employee.employeeName}
                  </Option>
                ))}
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
          
          onChange={(e) =>
            props.onChange({
              ...props.message,
              message: e.target,
            })
          }
        />
      </Form.Item>

      <div class="flex justify-evenly">
        <Form.Item class="text-center">
          <Button type="primary" onClick={props.prev}>
            Back
          </Button>
        </Form.Item>
        <Form.Item class="text-center">
          <Button type="primary" onClick={props.next}>
            Clear
          </Button>
        </Form.Item>
        <Form.Item class="text-center">
          <Button type="primary" onClick={props.next}>
            Next
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default WelfareMessage;
