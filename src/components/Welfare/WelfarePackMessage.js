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
  // const { setStep, userData, setUserData } = useContext(multiStepContext);

  const [form] = Form.useForm();

  const onFinish = (fieldsValue) => {
    const formData = form.getFieldsValue();
    console.log(formData);
    props.next();
  };

  // const [form] = Form.useForm();

  const handleSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    console.log("Success:", e.target.value);
  };

  const handleNext = () => {
    console.log("handleNext");
    console.log(welfareData.department);
    console.log(welfareData.receiverName);
    console.log(welfareData.message);
  };

  const [welfareData, setWelfareData] = useState({
    department: "",
    receiverName: "",
    message: "",
  });

  const clear = () => {
    setWelfareData({
      department: "",
      receiverName: "",
      message: "",
    });
  };

  return (
    <div class="my-8">
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
        form={form}
        onSubmit={handleSubmit}
        // form={form}
      >
        <div class="grid grid-rows-1 grid-cols-2 gap-y-10 w-30 align-middle ">
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
                  setWelfareData({
                    ...welfareData,
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
                  setWelfareData({
                    ...welfareData,
                    receiverName: e,
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
        </div>

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
              setWelfareData({
                ...welfareData,
                message: e.target.value,
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
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default WelfareMessage;
