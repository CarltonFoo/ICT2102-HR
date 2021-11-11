import React from "react";
import Tween, { TweenOneGroup } from 'rc-tween-one';
import { Rate, Button, Tooltip } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';


const customIcons = {
  1: <FrownOutlined style={{ fontSize: 28 }} />,
  2: <FrownOutlined style={{ fontSize: 28 }} />,
  3: <MehOutlined style={{ fontSize: 28 }} />,
  4: <SmileOutlined style={{ fontSize: 28 }} />,
  5: <SmileOutlined style={{ fontSize: 28 }} />,
};

class Mood extends React.Component {

  state = {
    isActive: false
  };

  moodState = {
    moodStatus: customIcons[5]
  };


  handleShow = () => {
    this.setState({ isActive: true });
  };

  handleHide = () => {
    this.setState({ isActive: false });
  };

  handleRatingChange(value) {
    console.log(value);
    // this.setState({ moodStatus: customIcons[value] });

}
  //onMouseLeave={this.handleHide}
  render() {
    return (
      <div>
        <div >
          <Tooltip title="How are you feeling today?">
            <Button type="primary" shape="circle" size="large" style={{ cursor:'default', position: 'absolute', bottom: 20, right: 40, zIndex: 1 }} 
            onMouseEnter={this.handleShow} icon={customIcons[5]} />
          </Tooltip>
        </div>
        <TweenOneGroup >
          {this.state.isActive ? (
            <div>
              <Tween
                animation={{ x: -50 }}
                style={{ opacity: 1, position: 'absolute', bottom: 20, right: 40, zIndex: 1 }}
              >
                <div onMouseLeave={this.handleHide} onClick={this.handleHide} >
                  
                  <Rate  style={{ background: 'white'}} 
                  allowClear={false} defaultValue={5} character={({ index }) => customIcons[index + 1]} />
             
                </div>
              </Tween>
            </div>
          ) : (
            <Button type="Default" shape="circle" size="large" style={{ position: 'absolute', bottom: 20, right: 45 }}
              onMouseEnter={this.handleShow} icon={customIcons[5]} />
          )}
        </TweenOneGroup>
      </div>);
  }
}

export default Mood;