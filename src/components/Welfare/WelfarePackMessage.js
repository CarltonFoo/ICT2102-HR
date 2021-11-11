import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { Col, Row, Form, Select, Input, Button, Checkbox } from "antd";
import Employees from "../../data/employees.json";
const { Option } = Select;
const { TextArea } = Input;

const WelfareMessage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div class="flex ">
        <Form.Item
          name="employee"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select
            trigger={["hover"]}
            showSearch
            placeholder="Select a department"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Employees.map((employee) => (
              <Option value={employee.department}>{employee.department}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          rules={[{ required: true, message: "Please select department!" }]}
        >
          <Input.Password />
        </Form.Item>
      </div>

      <Form.Item
        wrapperCol={{
          offset: 8,
        }}
      >
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // <Form
    //   name="basic"
    //   labelCol={{
    //     span: 8,
    //   }}
    //   wrapperCol={{
    //     span: 16,
    //   }}
    //   initialValues={{
    //     remember: true,
    //   }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    // >
    //   <Form.Item
    //     wrapperCol={{
    //       offset: 7,
    //       span: 16,
    //     }}
    //   >
    //     <Row gutter={3}>
    //       <Col>
    //         <Form.Item
    //           name="department"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please select a Department",
    //             },
    //           ]}
    //         >
    //           <Select
    //             trigger={["hover"]}
    //             showSearch
    //             style={{ width: 200 }}
    //             placeholder="Select a department"
    //             optionFilterProp="children"
    //             onChange={onChange}
    //             onSearch={onSearch}
    //             filterOption={(input, option) =>
    //               option.children.toLowerCase().indexOf(input.toLowerCase()) >=
    //               0
    //             }
    //           >
    //             {Employees.map((employee) => (
    //               <Option value={employee.department}>
    //                 {employee.department}
    //               </Option>
    //             ))}
    //           </Select>
    //         </Form.Item>
    //       </Col>

    //       <Col span={6}>
    //         <Form.Item
    //           name="employee"
    //           rules={[
    //             {
    //               required: true,
    //               message: "Please select a Employee",
    //             },
    //           ]}
    //         >
    //           <Select
    //             showSearch
    //             style={{ width: 200 }}
    //             placeholder="Select an employee"
    //             optionFilterProp="children"
    //             onChange={onChange}
    //             onSearch={onSearch}
    //             filterOption={(input, option) =>
    //               option.children.toLowerCase().indexOf(input.toLowerCase()) >=
    //               0
    //             }
    //           >
    //             {Employees.map((employee) => (
    //               <Option value={employee.employeeName}>
    //                 {employee.employeeName}
    //               </Option>
    //             ))}
    //           </Select>
    //         </Form.Item>
    //       </Col>
    //     </Row>
    //   </Form.Item>

    //   <Form.Item
    //     name="message"
    //     wrapperCol={{
    //       offset: 7,
    //       span: 16,
    //       alignItems: "center",
    //     }}
    //     rules={[
    //       {
    //         required: true,
    //         message: "Please enter a message",
    //       },
    //     ]}
    //   >
    //     <TextArea
    //       placeholder="Enter Message"
    //       allowClear
    //       autoSize={{ minRows: 3, maxRows: 5 }}
    //       style={{ width: 465 }}
    //     />
    //   </Form.Item>
    // </Form>
  );
};

export default WelfareMessage;
