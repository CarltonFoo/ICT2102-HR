import React from "react";
import ReactTooltip from 'react-tooltip';
import { InfoCircleTwoTone } from "@ant-design/icons";
import { Popover, Popconfirm, Tag, Table, Button, Card, Col, Row } from "antd";
import approvalData from "../../data/approval.json";
import inventoryData from "../../data/inventory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import "./approvalstyle.css";
import { fixedBase } from "@antv/util";
import { removeWelfareRequest, updateStock } from "../../api";


class WelfareApproval extends React.Component {
  tablerecords = [];
  state = {
    visible: false,
    selectedRowKeys: [], // Check here to configure the default column
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Sender",
        dataIndex: "sender",
      },
      {
        title: "Receiver",
        dataIndex: "receiver",
      },
      {
        title: "Welfare Pack Type",
        dataIndex: "gifttype",
      },
    ];
    this.state = {
      dataSource: approvalData
    };
  }
  updateJSONdata = async () => {
    //get all the data
    // const dataSource = [...this.state.dataSource];
    var temp = [];
    //pass selected key
    if (typeof this.state.selectedRowKeys !== "undefined") {
      const selectedKey = [...this.state.selectedRowKeys];
      console.log("selectedPackagesArr: ", selectedKey);
      var temp = this.state.dataSource.filter((item) => selectedKey.includes(item.key));
      // storing gift type+ count 
      var _ = require('underscore')
      var countArr = _.countBy(temp, function (temp) { return temp.gifttype });
      countArr.selectedKeys = selectedKey;
      console.log("countArr", countArr);
      removeWelfareRequest(countArr);
    } else {
      // if no items selected
      return "Please select items to approve.";
    }
  };
  getSelectedPackages = (key) => {
    const dataSource = [...this.state.dataSource];
    var temp = [];

    //if items are selected 
    if (typeof this.state.selectedRowKeys !== 'undefined') {
      temp = dataSource.filter(item => this.state.selectedRowKeys.includes(item.key));
      // console.log("selectedPackagesArr: ",temp);
      var giftText = ""

      // for(var i = 0; i < temp.length ; i++){
      //   giftText = giftText + "Gift type no: "+ i + " , "+ temp[i].gifttype + '\n';
      // }
      var _ = require('underscore')
      var countArr = _.countBy(temp, function (temp) { return temp.gifttype });

      for (var giftname in countArr) {
        giftText = giftText + countArr[giftname] + " x " + giftname + "\n";
      }

      if (giftText == "") return "Please select items to approve."
      return giftText;
    }
    else {
      // if no items selected
      return "Please select items to approve."
    }
  }
  handleDelete = () => {
    // console.log("handle delete");
    const dataSource = [...this.state.dataSource];
    // console.log("datasource:", dataSource);
    // console.log("selectedRows", this.state.selectedRowKeys);
    //error check ensure selectedkeys initialized

    if (typeof this.state.selectedRowKeys !== 'undefined') {

      const selectedKey = [...this.state.selectedRowKeys];
      var temp = this.state.dataSource.filter((item) => selectedKey.includes(item.key));
      // storing gift type+ count 
      var _ = require('underscore')
      var countArr = _.countBy(temp, function (temp) { return temp.gifttype });

      //  ensure sufficient in stock.
      const inventory = inventoryData;
      for (var giftname in countArr) {
        //iterate through inventoryJSON objs
        for (var item in inventory) {
          // console.log("gift type "+key+ " count: "+req.body[key])
          if (inventory[item].name == giftname) {

            var updatedCount = inventory[item].instock - countArr[giftname];
            if (updatedCount < 0) {
              alert("Ensure sufficient stock for : " + giftname);
              //end flow if error, should work on ui
              return;
            }
          }
        }

      }
      // - error check end
      this.setState({
        dataSource: dataSource.filter(item =>
          !this.state.selectedRowKeys.includes(item.key)
        ),
      });
      //update backend json file
      this.updateJSONdata();
    }
    this.hide()
  };


  render() {
    const { selectedRowKeys } = this.state;
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        // Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              console.log(index);
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              console.log(index);
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };


    return (
      <div class="m-auto w-11/12">
        <div class="text-2xl font-bold my-6">
          Welfare Approval
          <div data-tip="Manage all welfare pack requests" class="inline">
            <InfoCircleTwoTone style={{ fontSize: '18px' }} twoToneColor="#A3A989" class="inline-block" className={"px-4"} />
          </div>
          <ReactTooltip place="right" effect="solid" />
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
        <Popover
          overlayInnerStyle={{ textAlign: "center", whiteSpace: "pre-line", width: '60vw', height: '20vw' }}
          content={
            <>
              <p class="font-bold text-center text-blue-800">Selected Gifts to approve</p>
              <p>{this.getSelectedPackages()}</p>
              <Button type="primary" onClick={() => this.hide()} style={{ position: "absolute", bottom: "3vw", left: "15vw" }}>Back</Button>
              <Button type="primary" onClick={() => this.handleDelete()} style={{ position: "absolute", bottom: "3vw", right: "15vw" }}>Approve</Button>
              {/* <a onClick={this.handleDelete}>Approve</a> */}
            </>
          }
          title={<b>Confirm Approval</b>}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button
            style={{ margin: "0 30vw" }}
            type="primary"
            onClick={() => this.getSelectedPackages()}
          >
            Approve
          </Button>
        </Popover>
        {/* </Popconfirm> */}
      </div>

    );
  }

}


export default WelfareApproval;