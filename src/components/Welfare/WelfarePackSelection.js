import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button, Form, Select, Radio } from "antd";
import { StepPanel } from "./StepPanel";
import SharedCard from "../Shared/Card";

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

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item
          name="welfarepack"
          rules={[
            {
              required: true,
              message: "Please select a Welfare Pack",
            },
          ]}
        >
          <div class="flex">
            {WelfarePack.map((data) => {
              return (
                <Card
                  title={data.welfarePack}
                  hoverable={true}
                  style={{ textAlign: "center", margin: "5%" }}
                  onClick={() => props.onSelectPack(data.welfarePack)}
                  class="h-72"
                >
                  <div>
                    <Radio
                      rules={[
                        {
                          required: true,
                          message: "Please select a Welfare Pack",
                        },
                      ]}
                    >
                      <p class="font-bold text-center text-blue-800">
                        Package Content
                      </p>

                      {data.packContent.map((item) => (
                        <div>
                          <p>{item.item1}</p>
                          <p>{item.item2}</p>
                          <p>{item.item3}</p>
                        </div>
                      ))}
                      <p class="font-bold text-center text-blue-800">
                        {data.dispatchedDay}
                      </p>

                      <p class="font-semibold text-center ">
                        Credits Required {data.credits}
                      </p>
                    </Radio>
                  </div>
                </Card>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item class="text-center">
          <Button type="primary" htmlType="submit" onClick={props.next}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WelfarePackSelection;
