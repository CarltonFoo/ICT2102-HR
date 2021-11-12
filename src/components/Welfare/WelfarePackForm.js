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
import WelfarePackConfirmation from "./WelfarePackComfirmation";
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const onSelectPack = (packName) => {
  alert("welfare pack name" + packName);
  this.setFields(this.fields.welfarepack = packName)
};

const WelfarePackForm = () => {
  const [fields, setFields] = useState({
    welfarepack: "",
    department: "",
    receiver: "",
    message: "",
  });
  
  const [current, setCurrent] = useState(0);
  // const [summary, setSummary] = useState({});

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

  // const [welfareData, setWelfareData] = useState({
  //   department: "",
  //   receiverName: "",
  //   message: "",
  // });


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
    
    console.log("fields", fields)
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
          // summary={summary} 
          prev={prev} />
      )}
    </div>
  );
};;

export default WelfarePackForm;
