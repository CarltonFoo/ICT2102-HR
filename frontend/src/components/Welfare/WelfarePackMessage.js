import React, { useState, useEffect, useContext } from "react";
import { Form, Select, Button, Input } from "antd";
import { UserOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";
import Employees from "../../data/employees.json";

const { Option } = Select;
const { TextArea } = Input;

const WelfareMessage = (props) => {
  const handleNext = () => {
    if (props.department && props.receiver && props.message) {
      props.next();
    }
    localStorage.setItem("department", props.department);
    localStorage.setItem("receiver", props.receiver);
    localStorage.setItem("message", props.message.value);
  };

  return (
    <div class="py-8">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleNext}
      >
        <div class="flex justify-evenly pt-6">
          <Form.Item>
            <div class="flex justify-evenly space-x-32">
              <div class="flex">
                <div class="w-9 h-9 bg-blue-200 rounded-full text-center text-xl text-blue-800">
                  <HomeOutlined />
                </div>
                <div class="pl-3">
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
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
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
                </div>
              </div>
              <div class="flex">
                <div class="w-9 h-9 bg-blue-200 rounded-full text-center text-xl text-blue-800">
                  <UserOutlined />
                </div>
                <div class="pl-3">
                  <Form.Item
                    name="employee"
                    rules={[
                      {
                        required: true,
                        message: "Please select a receiver",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a receiver"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
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
                </div>
              </div>
            </div>
          </Form.Item>
        </div>
        <div class="flex justify-evenly">
          <div class="flex">
            <div class="w-9 h-9 bg-blue-200 rounded-full text-center text-xl text-blue-800">
              <MailOutlined />
            </div>
            <div class="pl-3">
              <div>
                <Form.Item
                  name="message"
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
                    style={{ width: 580 }}
                    onChange={(e) =>
                      props.onChange({
                        ...props.message,
                        message: e.target,
                      })
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-evenly py-8">
          <Form.Item class="text-center">
            <Button type="primary" onClick={props.prev}>
              Back
            </Button>
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

export default WelfareMessage;
