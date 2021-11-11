import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row, Image, Button, Form } from "antd";
import { StepPanel } from "./StepPanel";

const WelfarePackSelection = () => {
  //   const { setStep, welfareData, setwelfareData } = useContext(multiStepContext);
  const retrieveData = (e) => {
    // e.preventDefault();
    // console.log(e.target);
    console.log(e.target.innerText);
  };

  return (
    <div>
      <Row gutter={16}>
        {WelfarePack.map((data) => {
          console.log(data);
          return (
            <Col span={8} xs={24} xl={8}>
              <Card
                title={data.welfarePack}
                hoverable={true}
                style={{ textAlign: "center", margin: "5%" }}
                onClick={retrieveData}
              >
                <div>
                  <p class="font-bold text-center text-blue-800">
                    Package Content{data.packContent}
                  </p>
                </div>
                <p class="font-bold text-center text-blue-800">
                  {data.dispatchedDay}
                </p>

                <p class="font-semibold text-center ">{data.credits}</p>
                {data.packContent.map((items) => (
                  <p>{items.item1}</p>
                ))}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WelfarePackSelection;
