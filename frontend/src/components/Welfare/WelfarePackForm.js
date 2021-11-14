import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Steps } from "antd";
import WelfarePackSelection from "./WelfarePackSelection";
import WelfarePackMessage from "./WelfarePackMessage";
import WelfarePackConfirmation from "./WelfarePackConfirmation";

const { Step } = Steps;

const WelfarePackForm = (props) => {
  const [fields, setFields] = useState({
    welfarepack: "",
    department: "",
    receiver: "",
    message: "",
    credits: "",
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
  //go next step
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

  // const onSelectPack = (packName) => {
  //   localStorage.getItem("welfarepack", props.welfarepack);
  // };

  return (
    <div>
      <Steps current={current} type="navigation">
        {steps.map((item, index) => (
          <Step key={index} title={item.title} description={item.description} />
        ))}
      </Steps>

      {current === 0 && (
        <WelfarePackSelection
          {...fields}
          next={next}
          onChange={handleFormChange}
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

      {current === 2 && <WelfarePackConfirmation {...fields} prev={prev} />}
    </div>
  );
};

export default WelfarePackForm;
