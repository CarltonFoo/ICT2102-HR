import React from "react";
import { Col, Row, Form, Select, Button, Input } from "antd";
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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleNext}
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
                initialValue={localStorage.getItem("department")}
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
            </Col>

            <Col span={6}>
              <Form.Item
                name="employee"
                rules={[
                  {
                    required: true,
                    message: "Please select an Employee",
                  },
                ]}
                initialValue={localStorage.getItem("receiver")}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select an employee"
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
          initialValue={localStorage.getItem("message")}
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
