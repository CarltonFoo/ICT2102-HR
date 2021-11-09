import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button } from "antd";
import { StepPanel } from "./StepPanel";

const WelfarePackSelection = () => {
  //   const { setStep, welfareData, setwelfareData } = useContext(multiStepContext);

  return (
    <div>
      <Row gutter={16}>
        {WelfarePack.map((data) => {
          return (
            <Col span={8} xs={24} xl={8}>
              <Card
                title={data.welfarePack}
                hoverable={true}
                style={{ textAlign: "center", margin: "5%" }}
              >
                Card content
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WelfarePackSelection;
