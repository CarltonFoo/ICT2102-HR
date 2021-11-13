import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import Card from "../Shared/Card.js";
import { Col, Row, Avatar, Steps, Form, Select, Button, Input } from "antd";
import { StepPanel } from "./StepPanel";
import WelfarePackSelection from "./WelfarePackSelection";
import WelfarePackMessage from "./WelfarePackMessage";
import WelfarePackConfirmation from "./WelfarePackConfirmation";
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const WelfarePackForm = (props) => {

  const [fields, setFields] = useState({
    welfarepack: "",
    department: "",
    receiver: "",
    message: "",
  });
  
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Pack Selection",
    },
    {
      title: "Craft Message",
    },
    {
      title: "Confirmation",
    },
  ];

  //go prev step
  function prev() {
    const newCurrent = current - 1;
    setCurrent(newCurrent);
  }
  //go next setp
  function next() {
    const newCurrent = current + 1;
    setCurrent(newCurrent);
  }

  const handleFormChange = (changedFields) => {
    setFields({
      ...fields,
      ...changedFields,
    });
    
    console.log("changedFields", changedFields)
    console.log("fields", fields)
  };

  
  const onSelectPack = (packName) => {
    alert("welfare pack name" + packName);
  };

  return (
    <div class="p-12">
      {/* step panel */}
      <Steps current={current} type="navigation">
        {steps.map((item, index) => (
          <Step key={index} title={item.title} description={item.description} />
        ))}
      </Steps>

      {current === 0 && (
        <WelfarePackSelection
          {...fields}
          next={next}
          // onChange={setWelfarePack(e.target.value)}
          onChange={handleFormChange}
          onSelectPack={onSelectPack}
        />
      )}

      {current === 1 && (
        <WelfarePackMessage
          {...fields}
          next={next}
          prev={prev}
          onChange={handleFormChange}
        />
      )}

      {current === 2 && (
        <WelfarePackConfirmation
          {...fields} 
          prev={prev} />
      )}
    </div>
  );
};;

export default WelfarePackForm;
