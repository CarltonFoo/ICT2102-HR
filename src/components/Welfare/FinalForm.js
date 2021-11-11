import React from "react";
import { useStepsForm } from "sunflower-antd";
import {
  Card,
  Col,
  Row,
  Steps,
  Input,
  Button,
  Form,
  Result,
  Select,
} from "antd";
import WelfarePackSelection from "./WelfarePackSelection";
import WelfarePackMessage from "./WelfarePackMessage";
import WelfarePackConfirmation from "./WelfarePackComfirmation";
import WelfarePack from "../../data/welfare.json";
const { Option } = Select;
const { TextArea } = Input;

const { Step } = Steps;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default (props) => {
  const {
    form,
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading,
  } = useStepsForm({
    async submit(values) {
      const { pack, name, department, message } = values;
      console.log(pack, name, department, message);
      await new Promise((r) => setTimeout(r, 1000));
      return "ok";
    },
    total: 3,
  });

  const formList = [
    <div>
      <Form.Item
        name="pack"
        rules={[
          {
            required: false,
            message: "Please select a Welfare Pack",
          },
        ]}
      >
        <Row gutter={16}>
          {WelfarePack.map((data) => {
            return (
              <Col span={8} xs={24} xl={8}>
                <div>
                  <Card
                    onClick={() => console.log(data.welfarePack)}
                    title={data.welfarePack}
                    hoverable={true}
                    style={{ textAlign: "center", margin: "5%" }}
                  >
                    Card content
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Form.Item>

      <Form.Item>
        <Button onClick={() => gotoStep(current + 1)}>Next</Button>
      </Form.Item>
    </div>,

    //Message form
    <>
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
                showSearch
                style={{ width: 200 }}
                placeholder="Select an Empolyee"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                filterOption={(input, option) =>
                  option.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

      <Form.Item {...tailLayout}>
        <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          loading={formLoading}
          onClick={() => {
            submit().then((result) => {
              if (result === "ok") {
                gotoStep(current + 1);
              }
            });
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </>,
  ];

  return (
    <div>
      <Steps type="navigation" {...stepsProps}>
        <Step title="Pack Selection" />
        <Step title="Craft Message" />
        <Step title="Confirm Details" />
      </Steps>

      <div style={{ marginTop: 60 }}>
        <Form {...formProps} style={{ maxWidth: 600 }}>
          {formList[current]}
        </Form>

        {current === 2 && (
          <Result
            status="success"
            title="Submit is succeed!"
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    gotoStep(0);
                  }}
                >
                  Buy it again
                </Button>
                <Button>Check detail</Button>
              </>
            }
          />
        )}
      </div>
    </div>
  );
};
