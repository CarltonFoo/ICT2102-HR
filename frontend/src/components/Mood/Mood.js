import React from "react";
import Tween from 'rc-tween-one';
import { message, Button, Tooltip } from 'antd';
import { FrownOutlined, FrownFilled, MehOutlined, MehFilled, SmileOutlined, SmileFilled, CloseOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import { updateMood } from "../../api/index.js";
import EmployeesJSON from "../../data/employees.json";

// unselected icons
const customIcons = [
  <FrownOutlined style={{ fontSize: 40 }} />,
  <MehOutlined style={{ fontSize: 40 }} />,
  <SmileOutlined style={{ fontSize: 40 }} />,
]

// selected icons
const customIconsFilled = [
  <SmileOutlined style={{ fontSize: 40 }} />,
  <FrownFilled style={{ fontSize: 40 }} />,
  <MehFilled style={{ fontSize: 40 }} />,
  <SmileFilled style={{ fontSize: 40 }} />,
]

const customMessage = [
  "moody~",
  "so-so.",
  "happy!"
]

var userSess, userData;

class Mood extends React.Component {

  componentDidMount() {
    userSess = JSON.parse(sessionStorage.getItem("user"))
    userData = EmployeesJSON[0][userSess.username]
    this.setState({smileyFace: EmployeesJSON[0][userSess.username].mood})
    console.log(this.state.smileyFace)
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: EmployeesJSON,
      isActive: false,
      smileyFace: 0,
      selectedMood: []
    };
  }
  
  handleShow = () => {
    this.setState({ isActive: true });
    console.log("test" + EmployeesJSON[0][userSess.username].mood)
  };

  handleHide = () => {
    this.setState({ isActive: false });
  };

  handleSelect = async(i) => {
    this.setState({ isActive: false, smileyFace: customIconsFilled[i] });
    this.setState({ selectedMood: i })
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

    const selectedKey = [i+1, userSess.username];
    console.log("selectedMood: ", i);
    const res1 = await updateMood(selectedKey);
    console.log("res1", res1);
    if (res1.status === 200) {
      console.log("status 200");
    }
    else {
      // if no items selected
      return "Please select items to approve.";
    }

  };

  // handleSelect = (i) => {
  //   this.setState({ isActive: false, smileyFace: customIconsFilled[i] });
  //   this.setState({ selectedMood: i })
  //   message.open({
  //     content: 'Feeling ' + customMessage[i],
  //     duration: 3,
  //     icon: customIcons[i],
  //     className: "text-l font-bold my-4",
  //     style: {
  //       marginTop: '10vh',
  //       alignContent: 'center',
  //       color: '#f9a825'
  //     },
  //   });
  // };

  // getSelectedMood = async () => {
  //     const selectedKey = [...this.state.selectedMood];
  //     console.log("selectedMood: ", selectedKey);
  //     const res1 = await updateMood(selectedKey);
  //     console.log("res1", res1);
  //     if (res1.status === 200) {
  //       console.log("status 200");
  //   }
  // };

  render() {
    return (
      <div>
          <div>
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
              {customIconsFilled[this.state.smileyFace]}
            </button>
          </div>
        )}
      </div >);
  }
}

export default Mood;