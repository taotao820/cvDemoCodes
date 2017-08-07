import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import classNames from "classnames";
import Table from "antd/lib/table";
import style2 from "antd/lib/table/style/css";
import Button from "antd/lib/button";
import style1 from "antd/lib/button/style/css";
import Popconfirm from "antd/lib/popconfirm";
import style4 from "antd/lib/popconfirm/style/css";
import style3 from "../../../../Common/css/static/table";
import EditableCell from "./editableCell";
import style from "../style.scss";
class IdList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [
                {
                    title: "SerialNo",
                    dataIndex: "SerialNo",
                    width: "10%"
                },
                {
                    title: "idType",
                    dataIndex: "idType",
                    width: "24%",
                    render: (text, record, index) =>
                        this.renderColumns(
                            this.state.dataSource,
                            index,
                            "idType",
                            text
                        )
                },
                {
                    title: "idNum",
                    dataIndex: "idNum",
                    width: "48%",
                    render: (text, record, index) =>
                        this.renderColumns(
                            this.state.dataSource,
                            index,
                            "idNum",
                            text
                        )
                },
                {
                    title: "operation",
                    dataIndex: "operation",
                    width: "110",
                    render: (text, record, index) => {
                        const { editable } = this.state.dataSource[
                            index
                        ].idType;
                        return (
                            <div className="editable-row-operations">
                                {editable
                                    ? <span>
                                          <a
                                              onClick={() =>
                                                  this.editDone(index, "save")}
                                          >
                                              保存
                                          </a>
                                          <Popconfirm
                                              title="确定取消?"
                                              onConfirm={() =>
                                                  this.editDone(
                                                      index,
                                                      "cancel"
                                                  )}
                                          >
                                              <a>取消</a>
                                          </Popconfirm>
                                      </span>
                                    : <div><span>
                                          <a onClick={() => this.edit(index)}>
                                              修改
                                          </a>
                                      </span>
                                      <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(index)}>
                                        <a href="#">删除</a>
                                    </Popconfirm></div>
                                      }
                                    
                            </div>
                        );
                    }
                }
            ],
            count: 0,
            patientId: ""
        };
    }
    componentDidMount() {
        let token = window.sessionStorage.getItem("token");
        let url = `${global.host}patient/getBasPatientIds?token=${token}&patientId=${this.props.registerPatientState.patientId}&time=${new Date().getTime()}`;
        let result = global.get(url);
        result
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.code == 0) {
                    let dataObj = [];
                    data.data.length > 0
                        ? data.data.map(function(item, index) {
                              dataObj.push({
                                  key: index,
                                  SerialNo: {
                                      value: index + 1
                                  },
                                  idType: {
                                      editable: false,
                                      value: item.idType
                                  },
                                  idNum: {
                                      editable: false,
                                      value: item.idNum
                                  },
                                  patientId: {
                                      value: item.patientId
                                  }
                              });
                          })
                        : null;
                    // var _arr=[];
                    // dataObj.map((item)=>{
                    //     _arr.push(item.idType.value);
                    //     if(item.idType.value==="院内一卡通"){
                    //         this.props.dispatch({
                    //             type:"OPTION_DEFAULT_VALUE",
                    //         });
                    //     }
                    // })
                    // if( _arr.join(",").indexOf("院内一卡通")<0){
                    //     this.props.dispatch({
                    //         type:"OPTION_SELECT_VALUE",
                    //     });
                    // }
                    this.setState({
                        dataSource: dataObj,
                        columns: this.state.columns,
                        patientId: this.props.registerPatientState.patientId,
                        count: dataObj.length
                    });
                    this.sortDataObj();
                } else {
                }
            })
            .catch(err => console.log(err));
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.newDataObj != nextProps.newDataObj) {
            const count = this.state.count;
            const dataSource = this.state.dataSource;
            let flag=false;  
            dataSource.map((item,index)=>{
                if(item.idType.value===nextProps.newDataObj.idType){
                    global.message.warning('证件类型重复!');
                    flag=true;
                }               
            })
            if(flag) return;
            const newData = {
                key: count,
                SerialNo: {
                    value: count + 1
                },
                idType: {
                    editable: false,
                    value: nextProps.newDataObj.idType
                },
                idNum: {
                    editable: false,
                    value: nextProps.newDataObj.idNum
                },
                patientId: {
                    value: this.props.registerPatientState.patientId
                }
            };          
            dataSource.push(newData);
            //var _arr=[];
            dataSource.map((item,index)=>{
                item.SerialNo.value=index+1;
                //_arr.push(item.idType.value);
                // if(item.idType.value==="院内一卡通"){
                //     this.props.dispatch({
                //         type:"OPTION_DEFAULT_VALUE",
                //     });
                // }
                
            })
            // if( _arr.join(",").indexOf("院内一卡通")<0){
            //     this.props.dispatch({
            //         type:"OPTION_SELECT_VALUE",
            //     });
            // }
            this.setState({
                dataSource: dataSource,
                count: count + 1,
                columns:this.state.columns
            });
            this.sortDataObj();
        }
    }
    onDelete(index){
        const dataSource = this.state.dataSource;
        dataSource.splice(index, 1);
        dataSource.map((item,index)=>{
            item.SerialNo.value=index+1;
        })
        this.setState({ dataSource:dataSource });
        this.sortDataObj();
    }
    sortDataObj() {
        var saveData = [];
        var len = this.state.dataSource.length;
        for (var i = 0; i < len; i++) {
            saveData.push({
                patientId: this.props.registerPatientState.patientId,
                idType: this.state.dataSource[i].idType.value,
                idNum: this.state.dataSource[i].idNum.value
            });
        }
        this.props.dispatch({
            type: "UPDATE_IDMGR_INFO",
            data: saveData
        });
    }
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === "undefined") {
            return text;
        }
        return (
            <EditableCell
                editable={editable}
                value={text}
                onChange={value => this.handleChange(key, index, value)}
                status={status}
            />
        );
    }
    handleChange(key, index, value) {
        const { dataSource } = this.state;
        dataSource[index][key].value = value;
        this.setState({ dataSource });
    }
    edit(index) {
        const { dataSource } = this.state;
        Object.keys(dataSource[index]).forEach(item => {
            if (
                dataSource[index][item] &&
                typeof dataSource[index][item].editable !== "undefined"
            ) {
                dataSource[index][item].editable = true;
            }
        });
        this.setState({ dataSource });
    }
    editDone(index, type) {
        const { dataSource } = this.state;
        Object.keys(dataSource[index]).forEach((item) => {
            if (dataSource[index][item] && typeof dataSource[index][item].editable !== 'undefined') {
                dataSource[index][item].editable = false;
                dataSource[index][item].status = type;
            }
        });
            
        this.setState({ dataSource }, () => {
            Object.keys(dataSource[index]).forEach(item => {
                if (
                    dataSource[index][item] &&
                    typeof dataSource[index][item].editable !== "undefined"
                ) {
                    delete dataSource[index][item].status;
                }
            });
        });
        this.sortDataObj();
    }
    render() {
        const { dataSource, columns } = this.state;
        const idsInfoList = this.props.idsInfoList;
        const _dataSource = dataSource.map(item => {
            const obj = {};
            Object.keys(item).forEach(key => {
                obj[key] = key === "key" ? item[key] : item[key].value;
            });
            return obj;
        });
        return (
            <div id="idMgrTable" className={style["idList"]}>
                <Table
                    className={style["bgColor"]}
                    columns={columns}
                    dataSource={_dataSource}
                    size="default"
                    bordered={false}
                    scroll={{y: 460 }}
                    showHeader={false}
                    pagination={false}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { idsInfoList, registerPatientState } = state;
    return {
        idsInfoList,
        registerPatientState
    };
}
export default connect(mapStateToProps)(IdList);
