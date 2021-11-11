import React from "react";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const Mood = () => {
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <div>
      <Rate
        defaultValue={5}
        character={({ index }) => customIcons[index + 1]}
      />
    </div>
  );
};

export default Mood;
