import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button, Form, Select, Radio } from "antd";
import { StepPanel } from "./StepPanel";

const WelfarePackSelection = (props) => {
  //   const { setStep, welfareData, setwelfareData } = useContext(multiStepContext);
  const retrieveData = (e) => {
    // e.preventDefault();
    // console.log(e.target);
    console.log(e.target.innerText);
  };
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
          <Row gutter={16}>
            {WelfarePack.map((data) => {
              return (
                <Col span={8} xs={24} xl={8}>
                  <Card
                    title={data.welfarePack}
                    hoverable={true}
                    style={{ textAlign: "center", margin: "5%" }}
                    onClick={retrieveData}
                  >
                    <div>
                      <p class="font-bold text-center text-blue-800">
                        Package Content
                      </p>

                      {data.packContent.map((item) => (
                        <div class="">
                          <p>{item.item1}</p>
                          <p>{item.item2}</p>
                          <p>{item.item3}</p>
                        </div>
                      ))}
                    </div>
                    <p class="font-bold text-center text-blue-800">
                      {data.dispatchedDay}
                    </p>

                    <p class="font-semibold text-center ">
                      Credits Required {data.credits}
                    </p>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button color="primary" htmlType="submit" onClick={props.next}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WelfarePackSelection;
