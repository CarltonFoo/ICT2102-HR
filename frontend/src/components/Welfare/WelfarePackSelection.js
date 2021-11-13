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

  const [form] = Form.useForm();
  const [value, setValue] = React.useState(0);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(`radio checked: ${JSON.stringify(e)}`);
  //   form.validateFields(["welfarepack"], (err, values) => {
  //     if (!err) {
  //       props.next();
  //     }
  //   });
  // };
  
  const onFinish = (fieldsValue) => {
    const formData = form.getFieldsValue();
    console.log(formData);
    props.next();
  };

  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
    setValue(e.target.value);
    props.onChange({
      ...props.welfarepack,
      welfarepack: e.target.value,
    })
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
          <div class="flex">
            {WelfarePack.map((data) => {
              return (
                <Card
                  title={data.welfarePack}
                  hoverable={true}
                  style={{ textAlign: "center", margin: "5%" }}
                  
                  class="h-72"
                >
                  <div>
                    <Radio.Group 
                    onChange={onChange} 
                    value={value}
                    // onClick={() => 
                    // props.onChange({
                    //   ...props.welfarepack,
                    //   welfarepack: {value},
                    // })}
                    // clicking more than once will add letters to fields object as seperate arrays lol, will take a look again after styling
                  >
                      <Radio
                        rules={[
                          {
                            required: true,
                            message: "Please select a Welfare Pack",
                          },
                        ]}
                        value={data.welfarePack}
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
                    </Radio.Group>
                  </div>
                </Card>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          class="text-center"
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WelfarePackSelection;
