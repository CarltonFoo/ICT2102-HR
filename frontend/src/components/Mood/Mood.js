import React from "react";
import Tween from 'rc-tween-one';
import { message, Button, Tooltip } from 'antd';
import { FrownOutlined, FrownFilled, MehOutlined, MehFilled, SmileOutlined, SmileFilled, CloseOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';


const customIcons = [
  <FrownOutlined style={{ fontSize: 40 }} />,
  <MehOutlined style={{ fontSize: 40 }} />,
  <SmileOutlined style={{ fontSize: 40 }} />,
]

const customIconsFilled = [
  <FrownFilled style={{ fontSize: 40 }} />,
  <MehFilled style={{ fontSize: 40 }} />,
  <SmileFilled style={{ fontSize: 40 }} />,
]

const customMessage = [
  "moody~",
  "so-so.",
  "happy!"
]

class Mood extends React.Component {
  state = {
    isActive: false,
    smileyFace: customIcons[2]
  };

  handleShow = () => {
    this.setState({ isActive: true });
  };

  handleHide = () => {
    this.setState({ isActive: false });
  };

  handleSelect = (i) => {
    this.setState({ isActive: false, smileyFace: customIconsFilled[i] });
    message.open({
      content: 'Feeling ' + customMessage[i],
      duration: 3,
      icon: customIcons[i],
      className: "text-l font-bold my-4",
      style: {
        marginTop: '10vh',
        alignContent: 'center',
        color: '#f9a825'
      },
    });
  };

  render() {
    return (
      <div>
          <div>
            {/* // ask what tailwind color */}
            <button class="bg-yellow-300 hover:bg-yellow-500 text-black text-center rounded-full h-14 w-14 items-center shadow-xl"
              style={{ cursor: 'pointer', position: 'absolute', bottom: 20, right: 42, zIndex: 1 }}
              onClick={this.handleHide}  data-tip data-for="close"><CloseOutlined style={{ fontSize: 28 }}></CloseOutlined></button>
          </div>
          <ReactTooltip class="text-2xl font-bold my-6" id="close" place="top" effect="solid">Close</ReactTooltip>

        {this.state.isActive ? (
          <Tween
            animation={{ x: -50 }}
            style={{ opacity: 1, zIndex: 1, position: 'absolute', bottom: 20, right: 50 }}
          >
            <div style={{ border: '3px solid black', borderRadius: 50, width: 250, height: 60, zIndex: 1, textAlign: 'center', backgroundColor: 'white' }}>
              {customIcons.map((value, index) => {
                return <button class="bg-white-300 hover:bg-white-500 text-black text-center rounded-full h-14 w-14 items-center shadow-xl"
                  onClick={() => this.handleSelect(index)}
                  style={{ marginLeft: 10, padding: 5, border: '2 solid black' }}
                  onMouseEnter={({ target }) => target.style.color = '#f9a825'}
                  onMouseLeave={({ target }) => target.style.color = '#000000'}
                  key={index}>{value}</button>
              })}
            </div>
          </Tween>
        ) : (
          <div >
            <ReactTooltip class="text-2xl font-bold my-6" id="moodPrompt" place="top" effect="solid">How are you feeling today?</ReactTooltip>
            <button class="bg-yellow-300 hover:bg-yellow-500 text-black text-center rounded-full h-14 w-14 items-center shadow"
              style={{ cursor: 'select', position: 'absolute', bottom: 20, right: 42, zIndex: 1, color: '#000000' }}
              onClick={this.handleShow} data-tip data-for="moodPrompt">
              {this.state.smileyFace}
            </button>
          </div>

        )}
      </div >);
  }
}

export default Mood;