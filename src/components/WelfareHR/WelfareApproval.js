import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import {Tag, Table, Button, Card, Col, Row } from "antd";
import approvalData from "../../data/approval.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";

const columns = [
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

class WelfareApproval extends React.Component {
  
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  
  render() {
    const { selectedRowKeys } = this.state;
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
      <p class="text-2xl font-bold my-6">Welfare Inventory</p>
      <Table rowSelection={rowSelection} columns={columns} dataSource={approvalData} />
      <Button
            style={{ margin: "0 8px" }}
            type="primary"
            // onClick={() => next()}
          >
            Approve
   </Button>
    </div>

    );
  }

}


export default WelfareApproval;