import React from "react";
import Tween, { TweenOneGroup } from 'rc-tween-one';
import { message, Button, Tooltip } from 'antd';
import { FrownOutlined, FrownTwoTone, MehOutlined, MehTwoTone, SmileOutlined, SmileTwoTone, CloseOutlined } from '@ant-design/icons';



const customIcons = [
  <FrownOutlined style={{ fontSize: 40 }} />,
  <MehOutlined style={{ fontSize: 40 }} />,
  <SmileOutlined style={{ fontSize: 40 }} />,
]

const customIconsTwoTone = [
  <FrownTwoTone style={{ fontSize: 40 }} twoToneColor="#3b82f6" />,
  <MehTwoTone style={{ fontSize: 40 }} twoToneColor="#3b82f6" />,
  <SmileTwoTone style={{ fontSize: 40 }} twoToneColor="#3b82f6" />
]

const customMessage = [
  "moody~",
  "so-so.",
  "happy!"
]

class Mood extends React.Component {
  state = {
    isActive: false,
    smileyFace: customIcons[2],
  };



  handleShow = () => {
    this.setState({ isActive: true });
  };

  handleHide = () => {
    this.setState({ isActive: false });
  };

  handleSelect = (i) => {
    this.setState({ isActive: false, smileyFace: customIconsTwoTone[i] });
    message.open({
      content: 'Feeling ' + customMessage[i],
      duration: 3,
      icon: customIconsTwoTone[i],
      style: {
        marginTop: '20vh',
      },
    });
  };

  render() {
    return (
      <div>
        <div >
          <div data-tip="Close" class="inline">
            {/* // ask what tailwind color */}
            <button class="bg-yellow-300 hover:bg-yellow-500 text-black text-center rounded-full h-14 w-14 items-center shadow-xl"
              style={{ cursor: 'pointer', position: 'absolute', bottom: 20, right: 42, zIndex: 1 }}
              onClick={this.handleHide}><CloseOutlined style={{ fontSize: 28 }}></CloseOutlined></button>
          </div>
        </div>
        {this.state.isActive ? (
                      <Tween
                      animation={{ x: -50 }}
                      style={{ opacity: 1, zIndex: 1, position: 'absolute', bottom: 20, right: 50 }}
                    >
          <div style={{ border: '2px solid black', borderRadius: 50, width: 250, height: 60, zIndex: 1, textAlign: 'center', backgroundColor: 'white'}}>
              {customIcons.map((value, index) => {
                return <button class="bg-white-300 hover:bg-white-500 text-black text-center rounded-full h-14 w-14 items-center shadow-xl"
                  onClick={() => this.handleSelect(index)}
                  style={{ marginLeft: 10,  padding: 5 }}
                  onMouseEnter={({ target }) => target.style.color = '#F9C80E'}
                  onMouseLeave={({ target }) => target.style.color = '#000000'}
                  key={index}>{value}</button>
              })}
          </div>
          </Tween>
        ) : (
          <div data-tip="How are you feeling today?" class="inline">
            <button class="bg-yellow-300 hover:bg-yellow-500 text-black text-center rounded-full h-14 w-14 items-center shadow"
              style={{ cursor: 'select', position: 'absolute', bottom: 20, right: 42, zIndex: 1, color: '#000000' }}
              onClick={this.handleShow} >
              {this.state.smileyFace}
            </button>
          </div>
        )}
      </div >);
  }
}

export default Mood;