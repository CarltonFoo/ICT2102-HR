import React from "react";
import Tween, { TweenOneGroup } from 'rc-tween-one';
import { Button, Tooltip } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined, CloseOutlined } from '@ant-design/icons';

const customIcons = [
  <FrownOutlined style={{ fontSize: 28 }} />,
  <MehOutlined style={{ fontSize: 28 }}  />,
  <SmileOutlined style={{ fontSize: 28 }}  />,]

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
    console.log(i);
    this.setState({ isActive: false, smileyFace: customIcons[i] });
  };

  handleRatingChange(value) {
    console.log(value);
  }
  render() {
    return (
      <div>
        <div >
          <div data-tip="Close" class="inline">
            <Button type="primary" shape="circle" size="large" style={{ cursor: 'pointer', position: 'absolute', bottom: 20, right: 40, zIndex: 1 }}
              onClick={this.handleHide} icon={<CloseOutlined></CloseOutlined>} />
          </div>
        </div>
        <TweenOneGroup >
          {this.state.isActive ? (
              <Tween
                animation={{ x: -50 }}
                style={{ opacity: 1, position: 'absolute', bottom: 100, right: 40, zIndex: 1 }}
              >
                {customIcons.map((value, index) => {
                  return <button onClick={() => this.handleSelect(index)} 
                  style={{ background: '#f4f4f4', border: '2px solid black', borderRadius: 50, padding: 5 }} 
                  onMouseEnter={({ target }) => target.style.color = '#F9C80E'} 
                  onMouseLeave={({ target }) => target.style.color = '#000000'} key={index}>{value}</button>
                })}
              </Tween>
          ) : (
            <div data-tip="How are you feeling today?" class="inline">
              <Button type="primary" shape="circle" size="large" style={{ cursor: 'select', position: 'absolute', bottom: 20, right: 40, zIndex: 1, color: '#000000' }}
                onClick={this.handleShow} icon={this.state.smileyFace} />
            </div>
          )}
        </TweenOneGroup>
      </div>);
  }
}

export default Mood;