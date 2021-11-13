import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Popover,Popconfirm, Tag, Table, Button, Card, Col, Row } from "antd";
import approvalData from "../../data/approval.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import "./approvalstyle.css";
import { fixedBase } from "@antv/util";
import { removeWelfareRequest } from "../../api";

class WelfareApproval extends React.Component {
  tablerecords = [];
  state = {
    visible: false,
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
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
      dataSource: approvalData,
    };
  }
  getSelectedPackages = async () => {
    //get all the data
    // const dataSource = [...this.state.dataSource];
    //creation of empty array
    var temp = [];

    //pass selected key
    if (typeof this.state.selectedRowKeys !== "undefined") {
      // temp = dataSource.filter((item) =>
      //   this.state.selectedRowKeys.includes(item.key)
      // );
      const selectedKey = [...this.state.selectedRowKeys];

      console.log("selectedPackagesArr: ", selectedKey);
      // var giftText = "";
      // for (var i = 0; i < temp.length; i++) {
      //   giftText =
      //     giftText + "Gift type no: " + i + " , " + temp[i].gifttype + "\n";
      // }
      // console.log("GIFT TEXT:\n", giftText);
      // if (giftText == "") return "Please select items to approve.";
      // return giftText;
      const res1 = await removeWelfareRequest(selectedKey);
      console.log(res1);
      if (res1.status === 200) {
        console.log("status 200");
      }
    } else {
      // if no items selected
      return "Please select items to approve.";
    }
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      // return {
      //   ...col,
      //   onCell: (record) => ({
      //     record,
      //     editable: col.editable,
      //     dataIndex: col.dataIndex,
      //     title: col.title,
      //     handleSave: this.handleSave,
      //   }),
      // };
    });
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
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
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
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
        <p class="text-2xl font-bold my-6">Welfare Approval</p>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />

        <Button
          style={{ margin: "0 30vw" }}
          type="primary"
          onClick={() => this.getSelectedPackages()}
        >
          Approve
        </Button>
        {/* </Popconfirm> */}
      </div>
    );
  }
}


export default WelfareApproval;