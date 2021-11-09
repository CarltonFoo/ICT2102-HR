import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import Card from "../Shared/Card";
import { Form, Input, Button } from "antd";
import LoginImg from "../../assets/images/login.png";
import "../../assets/css/button.css";
import users from "../../data/employees.json";

class FormDataComponent extends Component {
  userData;

  constructor(props) {
    //Must be called
    super(props);

    //Pass arguments to onChangeUsername
    this.onChangeUsername = this.onChangeUsername.bind(this);
    //Pass arguments to onChangePassword
    this.onChangePassword = this.onChangePassword.bind(this);
    //Pass arguments to onSubmit
    this.onSubmit = this.onSubmit.bind(this);

    //Setting state of input
    this.state = {
      username: "",
      password: "",
      
    };
  }

  // Form Events
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  //Checking with JSON file
  onSubmit(e) {
    e.preventDefault();
    this.userData = JSON.parse(localStorage.getItem("user"));

    for (let i = 0; i < users.length; i++) {
      if (
        this.userData.username === users[i].username &&
        this.userData.password === users[i].password
      ) {
        // Correct user credentials

        this.setState({
          username: users[i].username,
          password: users[i].password,
        });

        // setHasError(false);
        // setIsAuthenticated(true);

        return this.props.history.push("/");
      }
    }

    // setHasError(true);
  }


  // check if user previous logged in
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", JSON.stringify(nextState));
  }

  render() {
    return (
      <div class=" h-screen  ">
        <div class="m-auto w-8/12">
          <p class="text-6xl font-bold p-16 text-center text-blue-700 ">
            WorkLarh
          </p>
          <Card>
            <div class="flex">
              <div class="w-8/12 text-center">
                <h1 class="text-4xl font-bold  p-12 text-blue-700">
                  Login to Your Account!
                </h1>
                <p class="text-2xl font-medium">Your all in one workspace</p>
                <Form layout="vertical" scrollToFirstError>
                  <div class="w-8/12 m-auto">
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Username"
                        id="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="input password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <div class="text-center ">
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.onSubmit}
                      >
                        Login
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>

              <div class="w-8/12">
                <img src={LoginImg} alt="login img"/>
                {/* <h1 class="text-2xl font-bold text-center text-white mt-20"></h1> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default FormDataComponent;