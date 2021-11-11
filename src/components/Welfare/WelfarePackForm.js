// import React, { useState, useEffect, useContext } from "react";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import ReactTooltip from "react-tooltip";
// import Modal from "react-modal";
// import WelfarePack from "../../data/welfare.json";
// import Card from "../Shared/Card.js";
// import { Col, Row, Avatar, Steps, Form, Select, Button, Input } from "antd";
// import { StepPanel } from "./StepPanel";
// import WelfarePackSelection from "./WelfarePackSelection";
// import WelfarePackMessage from "./WelfarePackMessage";
// import WelfarePackConfirmation from "./WelfarePackComfirmation";
// const { Option } = Select;
// const { TextArea } = Input;

// const WelfarePackForm = () => {
//   const [stepForm] = Form.useForm();

//   const onFinish = (fieldsValue) => {
//     const formData = stepForm.getFieldsValue();

//     // POST the data to backend and show Notification
//     console.log(formData);
//   };

//   const onSelectPack = (packName) => {
//     alert("Hello from onSelectPack and my pack name is " + packName);
//   };

//   const steps = [
//     {
//       title: "Pack Selection",
//       content: <WelfarePackSelection onSelectPack={onSelectPack} />,
//     },
//     {
//       title: "Craft message",
//       content: <WelfarePackMessage />,
//     },
//     {
//       title: "Confirm Details",
//       content: <WelfarePackConfirmation />,
//     },
//   ];
//   return (
//     <div class="center">
//       <Form onFinish={onFinish}>
//         <StepPanel steps={steps} />
//       </Form>
//     </div>
//   );
// };

// export default WelfarePackForm;
