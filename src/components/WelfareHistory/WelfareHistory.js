import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { Popconfirm,Form,Input,Tooltip, Popover, Tag, Table, Button, Card, Col, Row } from "antd";
import historydata from "../../data/gifthistory.json";
import { getComponentController } from "@antv/g2/lib/chart/controller";
import { InfoCircleOutlined, EyeFilled } from '@ant-design/icons';
/*Library*/
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={()=>toggleEdit()}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class WelfareHistory extends React.Component {
 
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      dataSource: historydata,
      count: historydata.length,
      // handleDelete:this.handleDelete(key),

    };
    
    
    this.columns = [
      {
        title: "Date Requested",
        dataIndex: "date",
      },
      {
        title: "Recipient",
        dataIndex: "receiver",
      },
      {
        title: "Department",
        dataIndex: "department",
      },
      {
        title: "Product Name",
        dataIndex: "productname",
      },
      {
        title: "Delivery",
        dataIndex: "delivery",
        editable: true,
      },
      {
        // title: "Status",
        title: () => {
          const text = <><p>"Pending Approval" - Waiting on HR approval</p>
          <p>“Approved” - HR approved, preparing to send out</p>
          <p>“Sent out” - Welfare Package had been dispatched</p></> ;
          return (
            <>
          Status
          <Tooltip placement="top" title={text}>
            <InfoCircleOutlined style={{fontSize:'16px',position:'relative',left:'3px',bottom:''}}>Top</InfoCircleOutlined>
    
          </Tooltip>
            </>
          )
        },
        dataIndex: "status",
        key: 'status',
        
        // handleDelete(key){
        //   const dataSource = [...this.state.dataSource];
        //   this.setState({
        //     dataSource: dataSource.filter((item) => item.key !== key),
        //   });
        // },
        render(status,record) {
          let color = "blue";
          switch(status) {
            case "Pending Approval":
              color = "orange"
              break;
            case "Approved":
              color = "green"
              break;
            case "Sent out":
              color = "blue"
              break;
            default:
              color = "blue"
          }
        
          return (
            <>
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
              <Popover
                content={<>
                  <a onClick="">Edit Message</a><br></br>
                  <a onClick="">Change Delivery Date</a><br></br>
                  <a onClick="">View Details</a><br></br>
                  <a onClick="">View Details</a><br></br>

                  {/* <a onClick={()=> props.handleDelete(record.key)}>Cancel Order</a> */}
                  <a onClick="">Cancel Order</a>
    
                </>}
                trigger="click"
              >
                <Button type="text">:</Button>
              </Popover>
            </>
          );
    
        }
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      date: 'date',
      receiver: 'receiver',
      department: 'department',
      productname: 'name',
      delivery:'delivery',
      status:'Approved'
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
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
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          pagination={{pageSize:5}}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
// const WelfareHistory = () => {
//   const gridStyle = {
//     // width: '25%',
//     textAlign: 'center',
//   };

//   return (
//     <div>
//       <div class="m-auto w-11/12">
//         <p class="text-2xl font-bold my-6">Welfare Gift History</p>
//         <Table columns={columns} dataSource={historydata} pagination={{pageSize:5}} />
//       </div>
//     </div>
//   );
// };

export default WelfareHistory;