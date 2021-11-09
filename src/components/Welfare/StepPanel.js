import React, { useState } from "react";
import { Button, Steps } from "antd";
import welfareStyle from "./welfareStyle";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const StepPanel = (props) => {
  const classes = welfareStyle();
  const [activeStep, setActiveStep] = useState(0);

  function next() {
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  }

  return (
    <>
      <Steps
        type="navigation"
        current={activeStep}
        style={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {props.steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={classes.stepsContent}>
        {props.steps[activeStep].content}
      </div>
      <div className={classes.stepsAction}>
        {activeStep > 0 && <Button onClick={() => prev()}>Previous</Button>}
        {activeStep < props.steps.length - 1 && (
          <Button
            style={{ margin: "0 8px" }}
            type="primary"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {activeStep === props.steps.length - 1 && (
          <Button style={{ margin: "0 8px" }} type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export { StepPanel };
