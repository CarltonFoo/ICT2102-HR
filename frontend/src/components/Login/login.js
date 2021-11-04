import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import Card from "../Shared/Card";
import { Form, Input, Button } from "antd";
import LoginImg from "../../assets/images/4x/login.png";

const Login = () => {
  return (
    <div class="bg-gray-200 h-screen ">
      <div class="m-auto">
        <p class="text-4xl font-bold p-12 text-center ">WorkLarh </p>

        <Card>
          <div class="flex">
            <div class="w-8/12">
              <h1 class="text-2xl font-bold text-center  mt-20">
                Login to your account!
              </h1>
              <Form layout="vertical">
                <div class="w-8/12 m-auto">
                  <Form.Item label="First Name ">
                    <Input size="large" placeholder="Enter First Name" />
                  </Form.Item>
                  <Form.Item label="Last Name">
                    <Input size="large" placeholder="Enter Last Name" />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input size="large" placeholder="Enter Email" />
                  </Form.Item>
                </div>
              </Form>
            </div>

            <div class="w-8/12 ">
              <img src={LoginImg} />
              <h1 class="text-2xl font-bold text-center text-white mt-20">
                {/* Your all in one workspace */}
              </h1>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
