import React, { useState } from "react";
// import Modal from "react-modal";
import { Button, Divider, Modal, Image } from "antd";

import {
  GiftOutlined,
  UserOutlined,
  HomeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import AirplaneImg from "../../assets/images/airplane.png";

const handleBack = () => {};

const WelfarePackConfirmation = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        <h2 class="text-center text-3xl font-semibold mt-12 pt-6">
          Great! Everything is ready.
        </h2>
        <p class="text-center  text-blue-800 ">
          Thank you for spreading some love!
        </p>
      </div>
      <Divider />
      <div class="flex justify-evenly">
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <GiftOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Package Name </h3>
            <p>{props.welfarepack} </p>
          </div>
        </div>
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <UserOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Receiver </h3>
            <p>{props.receiver} </p>
          </div>
        </div>
        <div class="flex">
          <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
            <HomeOutlined />
          </div>
          <div class="pl-8">
            <h3 class="text-gray-400">Receiver Department</h3>
            <p>{props.department} </p>
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-evenly pr-16">
          <div class="text-center  pt-12 flex  ">
            <div class="w-12 h-12 bg-blue-200 rounded-full text-center text-2xl text-blue-800">
              <MailOutlined />
            </div>
            <div class="pl-8">
              <h3 class="text-gray-400">Message </h3>
              <p class="">{props.message.value} </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-evenly mt-48">
          <Button type="primary" onClick={props.prev}>
            Back
          </Button>
          <Button type="primary" htmlType="submit" onClick={showModal}>
            Send
          </Button>

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p class="text-center text-2xl font-semibold mt-10 pt-2">
              Preparing to send out the welfare pack
            </p>
            <Image class="content-center w-20 h-20" src={AirplaneImg} />
            <p class="text-center text-blue-800 text-xl font-semibold mt-12 pt-1">
              We're glad you've sent a welfare pack out your peers! It will be
              reviewed by the HR first
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default WelfarePackConfirmation;
