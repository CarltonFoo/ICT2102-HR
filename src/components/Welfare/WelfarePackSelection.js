import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import WelfarePack from "../../data/welfare.json";
import { Card, Col, Row } from "antd";

const WelfarePackSelection = (props) => {
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
                onClick={() => props.onSelectPack(data.welfarePack)}
              >
                <div>
                  <p class="font-bold text-center text-blue-800">
                    Package Content
                  </p>

                  {data.packContent.map((item) => (
                    <div class="">
                      <p>{item.item1}</p>
                      <p>{item.item2}</p>
                      <p>{item.item3}</p>
                    </div>
                  ))}
                </div>
                <p class="font-bold text-center text-blue-800">
                  {data.dispatchedDay}
                </p>

                <p class="font-semibold text-center ">
                  Credits Required {data.credits}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WelfarePackSelection;
