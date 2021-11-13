import { Steps, Button, message } from "antd";
import React, { useState } from "react";
import WelfarePackSelection from "./WelfarePackSelection";
import WelfarePackMessage from "./WelfarePackMessage";
import WelfarePackConfirmation from "./WelfarePackComfirmation";

const Step = Steps.Step;

const onSelectPack = (packName) => {
  alert("Hello from onSelectPack and my pack name is " + packName);
};

const steps = [
  {
    title: "Pack Selection",
    content: <WelfarePackSelection onSelectPack={onSelectPack} />,
  },
  {
    title: "Craft message",
    content: <WelfarePackMessage />,
  },
  {
    title: "Confirm Details",
    content: <WelfarePackConfirmation />,
  },
];

class WelfareRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}

          {this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}

          {this.state.current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default WelfareRequest;
