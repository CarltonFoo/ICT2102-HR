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
import { StepPanel } from "./StepPanel";
import SharedCard from "../Shared/Card";
import { DollarCircleFilled } from "@ant-design/icons";

const { Title } = Typography;
const WelfarePackSelection = (props) => {
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(["welfarepack"], (err, values) => {
      if (!err) {
        props.next();
      }
    });
  };

  const [value, setValue] = React.useState(0);
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
    setValue(e.target.value);
  }

  const onFinish = (fieldsValue) => {
    const formData = form.getFieldsValue();
    console.log(formData);
    props.next();
  };

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
          <div
            id="welfarecard"
            class="flex rounded shadow-md  place-content-center"
          >
            {WelfarePack.map((data) => {
              return (
                <div class="p-8">
                  <Radio.Group onChange={onChange} value={value} class="">
                    <Radio.Button value={data.welfarePack} class="h-72">
                      <Card
                        bordered={false}
                        id={data.id}
                        title={
                          <Title level={2} class="cardtitle">
                            {data.welfarePack}
                          </Title>
                        }
                        hoverable={true}
                        style={{ textAlign: "center", margin: "5%" }}
                        // onClick={() => props.onSelectPack(data.welfarePack)}
                        class="h-72 bg-transparent "
                      >
                        <div>
                          <div class="h-10">
                            <p class="font-bold text-center text-blue-800">
                              Package Content
                            </p>
                          </div>

                          {data.packContent.map((item) => (
                            <div class="h-33  font-sans text-xs ">
                              <p class="h-11 m-1 py-1 ">{item.item1}</p>
                              <p class="h-11 m-1 py-1 ">{item.item2}</p>
                              <p class="h-11 m-1 py-1 ">{item.item3}</p>
                            </div>
                          ))}

                          <Divider />

                          <p class="font-bold text-center text-blue-800">
                            {data.dispatchedDay}
                          </p>
                          <Divider />
                          <p class="font-semibold text-center  ">
                            <DollarCircleFilled class="inline-flex text-xl text-yellow-500" />{" "}
                            {data.credits} Credits
                          </p>
                        </div>
                      </Card>
                    </Radio.Button>
                  </Radio.Group>
                </div>
              );
            })}
          </div>
        </Form.Item>
        <div class="content-start md:content-around">
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

export default WelfarePackSelection;
