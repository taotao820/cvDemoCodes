/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Dialog from "../dialog/index";
import InputItem from "../inputItem";
import SelectItem from "../selectItem";
import DateInput from "../dateInput";
import Btn from "../button";
import Table from "./tablepart";
import Page from "./pagepart";
import {fetchMenu} from '../../../Action/register/patListWin';
class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: "序号", dataIndex: "id", key: "id", width: 50 },
                { title: "姓名", dataIndex: "patientName", key: "patientName" },
                { title: "性别", dataIndex: "sex", key: "sex" },
                { title: "出生日期", dataIndex: "dateOfBirthString", key: "dateOfBirthString" },
                { title: "联系电话", dataIndex: "phonecall", key: "phonecall" },
                { title: "证件号码", dataIndex: "idNum", key: "idNum" },
                { title: "地址", dataIndex: "homeAdd", key: "homeAdd" }
                // {
                //     title: "就诊历史",
                //     dataIndex: "history",
                //     key: "history",
                //     width: 135,
                //     render: () => <a onClick={this.queryHistoryList.bind(this)}>历史记录</a>
                // }
            ],
            dataSource: [
            ],
            options: [
                {
                    key: "就诊过",
                    value: "1"
                },
                {
                    key: "全医院",
                    value: "2"
                },
                {
                    key: "全区域",
                    value: "3"
                }
            ],
            pageInfo: {
                total: 55,
                pageSize: 10,
                pageIndex: 1
            },
            showTotalBar: true,
            startDate: "",
            endDate: "",
            patientName: "",
            idNum: "",
            searchRange: { key: "就诊过", value: "1" }
        };
    }
    componentWillMount() {
        this.doFetchList();
    }
    queryHistoryList(e){
        e.cancelBubble && e.cancelBubble();
        e.stopPropagation && e.stopPropagation();
        e.preventDefault();

    }
    doFetchList(btnSearch) {  
        if(btnSearch) this.state.pageInfo.pageIndex=1;this.setState({pageInfo:this.state.pageInfo});
        let param = global.objToParams(this.getData());
        fetchMenu(param).then(res=>{
            return res.json();
        }).then(data=>{
            if(data.code == 0){
                const { total, basPatientsList } = data.data;
                let temp = [];
                basPatientsList.map((item, index) => {
                    item.id = index+1;
                    temp.push(item);
                });
                this.state.pageInfo.total = total;
                total === 0
                    ? (this.state.showTotalBar = false)
                    : (this.state.showTotalBar = true);
                this.setState({
                    dataSource:temp,
                    pageInfo:this.state.pageInfo,
                    showTotalBar:this.state.showTotalBar
                });
                //this.removeCls();
                //var cls="ant-pagination-item-"+this.state.pageInfo.pageIndex;
                //ant-pagination-item ant-pagination-item-1 ant-pagination-item-active
                if(global.fixGetElementsByClassName('ant-pagination-options-quick-jumper','').length > 0)
                global.fixGetElementsByClassName('ant-pagination-options-quick-jumper','')[0].childNodes[1].value=this.state.pageInfo.pageIndex;
            } else{
                global.message.error('系统异常');
                //console.log(data.msg)
            }
        }).catch(err=>console.log(err));
    }
    getData() {
        let paramObj = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            patientName: this.state.patientName,
            idNum: this.state.idNum,
            searchRange: this.state.searchRange.value,
            curPage: this.state.pageInfo.pageIndex,
            pageSize: this.state.pageInfo.pageSize
        };
        return paramObj;
    }
    
    closeDialog() {
        this.props.dispatch({ type: "HIDE_COVER" });
        this.props.dispatch({ type: "HIDE_PATLIST" });
    }
    editNewFile() {
        this.props.dispatch({ type: "HIDE_PATLIST" });
        this.props.dispatch({
            type: "SHOW_EDITFILE"
        });
    }
    cbSelect(val, type) {
        let objSelected = this.state.options.filter(item => item.value == val);
        // console.log(objSelected)
        this.setState({ searchRange: objSelected[0] });
    }
    cbDate(val, type) {
        val = (!val)?'':global.dateFormat(val, "YY-MM-DD");
        if (type == "开始") this.setState({ startDate: val });
        if (type == "结束") this.setState({ endDate: val });
    }
    onInputChange(val, type) {
        if (type == "姓名") this.setState({ patientName: val });
        if (type == "身份证") this.setState({ idNum: val });
    }
    onHandlePageChange(pageInfo) {
        this.setState({ pageInfo });
        this.doFetchList();
    }
    render() {
        let { myStates } = this.props;
        let title = "人员列表";
        let arr2 = [
            {
                title: "开始",
                isClick: false,
                value: this.state.startDate,
                filterType: "startDate",
                type: "canlender"
            },
            {
                title: "结束",
                isClick: false,
                value: this.state.endDate,
                filterType: "endDate",
                type: "canlender"
            },
            {
                title: "姓名",
                isClick: false,
                filterType: "patientName",
                type: "input"
            },
            {
                title: "身份证",
                isClick: false,
                filterType: "idNum",
                id: "chargePayWay",
                type: "input"
            },
            {
                title: "检索范围",
                isClick: false,
                options: this.state.options,
                value: this.state.searchRange.value,
                filterType: "dept",
                type: "select"
            }
        ];
        return (
            <div className={style["record"]}>
                <Dialog
                    icon="Settlement"
                    dialogTitle={title}
                    csDialog={this.closeDialog.bind(this)}
                />
                <div className={style["dialog-bd"]}>
                    <div id='register-top' className={style["top"]}>
                        {arr2.map((msg, i) => {
                            if (msg.type == "input") {
                                return (
                                    <InputItem
                                        info={msg}
                                        cb={this.onInputChange.bind(this)}
                                    />
                                );
                            } else if (msg.type == "select") {
                                return (
                                    <SelectItem
                                        info={msg}
                                        cb={this.cbSelect.bind(this)}
                                    />
                                );
                            } else {
                                return (
                                    <DateInput
                                        info={msg}
                                        cb={this.cbDate.bind(this)}
                                    />
                                );
                            }
                        })}
                        <div className={style["div"]}>
                            <div className={style["patSearchSpan"]} onClick={this.doFetchList.bind(this,"btnSearch")}><img src={require("../../img/icon_putonfile.png")}/><span>检索</span></div>
                            <div className={style["patSearchSpan"]} onClick={this.editNewFile.bind(this)}><img src={require("../../img/icon_Register.png")}/><span>建档</span></div>
                            <div className={style["clear"]} />
                        </div>
                    </div>
                    <div id='register-list' className={style["register-list"]}>
                        <Table
                            dataSource={this.state.dataSource}
                            column={this.state.columns}
                        />
                        <Page
                            pageInfo={this.state.pageInfo}
                            showTotalBar={this.state.showTotalBar}
                            onChange={this.onHandlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { myStates } = state;
    return {
        myStates
    };
}
export default connect(mapStateToProps)(Record);
