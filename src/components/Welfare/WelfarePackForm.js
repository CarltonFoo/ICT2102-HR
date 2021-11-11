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
};
const WelfarePackForm = () => {
  const [fields, setFields] = useState({
    welfarepack: "",
    department: "",
    empolyee: "",
    message: "",
  });
  const [current, setCurrent] = useState(0);
  const [summary, setSummary] = useState({});
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

  function prev() {
    const newCurrent = current - 1;
    setCurrent(newCurrent);
  }
  function next() {
    const newCurrent = current + 1;
    setCurrent(newCurrent);
  }
  const handleFormChange = (changedFields) => {
    setFields({
      ...fields,
      ...changedFields,
    });
  };
  const fieldsFlattener = () => {
    var flattened = {};
    Object.keys(fields).map(
      (fieldName) => (flattened[fieldName] = fields[fieldName].value)
    );
    setSummary({ ...summary, flattened });
    next();
  };

  return (
    <div>
      <Steps current={current} type="navigation">
        {steps.map((item, index) => (
          <Step key={index} title={item.title} description={item.description} />
        ))}
      </Steps>

      {current === 2 && (
        <WelfarePackConfirmation summary={summary} prev={prev} />
      )}
      {current === 1 && (
        <WelfarePackMessage
          {...fields}
          next={next}
          prev={prev}
          onChange={handleFormChange}
        />
      )}
      {current === 0 && (
        <WelfarePackSelection
          {...fields}
          next={next}
          onChange={handleFormChange}
          onSelectPack={onSelectPack}
        />
      )}
    </div>
  );
};

export default WelfarePackForm;
