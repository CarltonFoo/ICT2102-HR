import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import {
  Card,
  Col,
  Row,
  Image,
  Button,
  Form,
  Select,
  Radio,
  Typography,
  Divider,
} from "antd";
import SharedCard from "../Shared/Card";
import { DollarCircleFilled } from "@ant-design/icons";

const { Title } = Typography;
const WelfarePackSelection = (props) => {
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(0);

  const onFinish = (fieldsValue) => {
    const formData = form.getFieldsValue(true);
    console.log(formData);
    props.next();
  };

  function onChange(e, credits) {
    console.log(`radio checked:${e.target.value},credits: ${credits}`);
    setValue(e.target.value, credits);
    props.onChange({
      ...props.welfarepack,
      ...props.credits,
      welfarepack: e.target.value,
      credits: e.target.credits,
    });
  }

  return (
    <div>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="welfarepack"
          rules={[
            {
              required: true,
              message: "Please select a Welfare Pack",
            },
          ]}
        >
          <div id="welfarecard" class="flex justify-center">
            {WelfarePack.map((data) => {
              return (
                <div class="p-8 text-center">
                  <Radio.Group
                    onChange={(e) => onChange(e, data.credits)}
                    value={value}
                  >
                    <Radio.Button
                      value={data.welfarePack}
                      credits={data.credits}
                      class="h-72"
                    >
                      <Card
                        bordered={true}
                        // id={data.id}
                        title={
                          <Title class="cardtitle">{data.welfarePack}</Title>
                        }
                        hoverable={true}
                        style={{ margin: "2%" }}
                        class="h-72 "
                      >
                        <div>
                          <div class=" text-semibold text-center text-blue-800 flex justify-center">
                            <p class="mr-2">📦</p>
                            <p>Package Content</p>
                          </div>

                          {data.packContent.map((item) => (
                            <div class="h-33  font-sans  ">
                              <p>{item.item1}</p>
                              <p>{item.item2}</p>
                              <p>{item.item3}</p>
                            </div>
                          ))}
                          <div class=" text-semibold text-center text-blue-800 flex justify-center">
                            <p class="mr-2">🚚</p>
                            <p>Delivery Details</p>
                          </div>
                          <p class=" font-lg font-sans ">
                            {data.dispatchedDay}
                          </p>
                          <Divider />

                          <div class=" ">
                            <p class="mr-2 text-gray-600">You need to pay</p>
                            <p class="text-xl"> {data.credits} Credits </p>
                          </div>
                          <Divider />
                        </div>
                      </Card>
                    </Radio.Button>
                  </Radio.Group>
                </div>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item>
          <div class="text-center">
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WelfarePackSelection;
