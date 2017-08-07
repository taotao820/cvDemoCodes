/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { doAddPatientInfo,getPatientInfoById } from "../../../Action/register/registerActions";
import style from "./style";
import classNames from "classnames";
import Dialog from "../../../Common/component/dialog/index";
import InnerForm from "./patientInfo";
import IdMgr from "./idMgr";
import Tabs from "antd/lib/tabs";
import style2 from "antd/lib/tabs/style/css";
import Button from "antd/lib/button";
import style3 from "antd/lib/button/style/css";
import style4 from "../../../Common/css/static/form";
const TabPane = Tabs.TabPane;

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabModule: "patient",
            defaultData: {},
        };
    }
    componentWillMount() {
        this.fetchList();
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.registerPatientState.state === "Success") {
    //         this.fetchList();
    //     }
    // }
    //产生随机标识 防止ie8浏览器缓存相同请求
    guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
            c
        ) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    fetchList() {
        let token = window.sessionStorage.getItem("token");
        let randomNum = this.guid();
        fetch(
            `${global.host}patient/patientInfoOptions?token=${token}&id=${randomNum}`
        )
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.code == 0) {
                    this.state.defaultData = data.data;
                    this.setState({
                        defaultData: this.state.defaultData
                    });
                } else {
                    global.message.error("系统异常");
                }
            })
            .catch(err => console.log(err));
    }
    sortDataSchema() {
        let Schema = [
            {
                dataType: "int",
                key: "patientId",
                title: "病人标识",
                value: this.state.defaultData.patientId || "",
                index: 0
            },
            {
                dataType: "string",
                key: "patName",
                title: "姓名",
                index: 1
            },
            {
                dataType: "string",
                key: "dateOfBirthString",
                title: "出生日期",
                index: 2
            },
            {
                dataType: "int",
                key: "postCode",
                title: "家庭邮编",
                index: 3
            },
            {
                dataType: "string",
                key: "contacter",
                title: "联系人",
                index: 4
            },
            {
                dataType: "string",
                key: "contacterIdNum",
                title: "联系人证件号",
                index: 5
            },
            {
                dataType: "string",
                key: "email",
                title: "电子邮箱",
                index: 6
            },
            {
                dataType: "string",
                key: "nationality",
                title: "国籍",
                options: this.state.defaultData.nationalityOptions || [],
                index: 7
            },
            {
                dataType: "string",
                key: "unitName",
                title: "单位名称",
                index: 8
            },
            {
                dataType: "string",
                key: "idType",
                title: "证件类型",
                options: this.state.defaultData.idTypeOptions || [],
                index: 9
            },
            {
                dataType: "string",
                key: "sex",
                title: "性别",
                index: 10,
                options: this.state.defaultData.sexOptions || []
            },
            {
                dataType: "string",
                key: "insType",
                title: "费用类别",
                options: this.state.defaultData.chargeTypeOptions || [],
                index: 11
            },
            {
                dataType: "string",
                key: "homeAdd",
                title: "家庭地址",
                index: 12
            },
            {
                dataType: "string",
                key: "phonecall",
                title: "联系电话",
                index: 13
            },
            {
                dataType: "string",
                key: "relation",
                title: "关系",
                index: 14
            },
            {
                dataType: "string",
                key: "professional",
                title: "职业名称",
                options: this.state.defaultData.professionalOptions || [],
                index: 15
            },
            {
                dataType: "string",
                key: "national",
                title: "民族",
                options: this.state.defaultData.nationalOptions || [],
                index: 16
            },
            {
                dataType: "string",
                key: "addType",
                title: "地址类别",
                options: this.state.defaultData.addressTypeOptions || [],
                index: 17
            },
            {
                dataType: "string",
                key: "idNum",
                title: "证件号",
                index: 18
            },
            {
                dataType: "string",
                key: "ageNumber",
                title: "年龄",
                index: 19
            },
            {
                dataType: "string",
                key: "discount",
                title: "优惠类别",
                options: this.state.defaultData.discountTypeOptions || [],
                index: 20
            },
            {
                dataType: "empty",
                key: "",
                title: "",
                index: 21
            },
            {
                dataType: "empty",
                key: "",
                title: "",
                index: 22
            },
            {
                dataType: "empty",
                key: "",
                title: "",
                index: 23
            },
            {
                dataType: "string",
                key: "culturalDegree",
                title: "文化程度",
                options: this.state.defaultData.culturalDegreeOptions || [],
                index: 24
            },
            {
                dataType: "string",
                key: "maritalStatus",
                title: "婚姻状况",
                options: this.state.defaultData.maritalStatusOptions || [],
                index: 25
            },
            {
                dataType: "string",
                key: "registerDate",
                title: "建档日期",
                disable: true,
                index: 26
            },
            {
                dataType: "string",
                key: "bloodType",
                title: "血型",
                options: this.state.defaultData.bloodTypeOptions || [],
                index: 27
            }
        ];
        return Schema;
    }
    closeDialog() {
        this.props.dispatch({
            type: "HIDE_EDITEFILE"
        });
        this.props.dispatch({
            type: "HIDE_COVER"
        });
        this.props.dispatch({
            type: "CLOSE_REGITER_DIALOG"
        });
    }
    changeTab(key) {
        if(key==="patient") getPatientInfoById(this.props.registerPatientState.patientId);
        this.state.tabModule = key;
        this.setState({ tabModule: this.state.tabModule });
    }
    handleFormSubmit(obj) {
        doAddPatientInfo(obj);
    }
    render() {
        let { showEditFile, registerPatientState } = this.props;
        let schema = this.sortDataSchema();
        let btnCls = style["botton-cls"];
        return (
            <div className={showEditFile ? style["record"] : ""}>
                <Dialog
                    icon="record"
                    dialogTitle="建档"
                    csDialog={this.closeDialog.bind(this)}
                />
                <div className={style["dialog-bd"]}>
                    <div
                        className={style["card-container"]}
                        id="registerDialogTab"
                    >
                        <Tabs type="card" onChange={this.changeTab.bind(this)}>
                            <TabPane tab="病人信息" key="patient" />
                            {registerPatientState.permitId
                                ? <TabPane tab="标识管理" key="idMgr" />
                                : <TabPane tab="标识管理" key="idMgr" disabled />}

                        </Tabs>
                    </div>
                    <div id='fileForm' className={style["form"]}>
                        {this.state.tabModule === "patient"
                            ? <InnerForm
                                  parentHandleSubmit={this.handleFormSubmit.bind(
                                      this
                                  )}
                                  parentHandleClose={this.closeDialog.bind(
                                      this
                                  )}
                                  schema={schema}
                                  ref="innerForm"
                              />
                            : <IdMgr ref="idMgr" />}

                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { showEditFile, registerPatientState } = state;
    return {
        showEditFile,
        registerPatientState
    };
}
export default connect(mapStateToProps)(Record);
