/**
 * Created by xuhuitao on 2017/05/12.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import classNames from "classnames";
import IdList from "./formSection/idList";
import IdForm from "./formSection/idForm";
import Button from "antd/lib/button";
import style1 from "antd/lib/button/style/css";
import style from "./style";
import { updateIdMgrList } from "../../../Action/register/registerActions";
class IdMgr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newDataObj: {},
            options: []
        };
    }

    componentWillMount() {
        let token = window.sessionStorage.getItem("token");
        let url = `${global.host}patient/getIdTypeOptions?token=${token}&patientId=${this.props.registerPatientState.patientId}&time=${new Date().getTime()}`;
        let result = global.get(url);
        result
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.code == 0) {
                    data.data;
                    let dataObj = [];
                    this.state.options = data.data.idTypeOptions;
                    this.setState({
                        options: this.state.options
                    });
                } else {
                    global.message.error("系统异常");
                }
            })
    }
    handleAdd(e) {
        e.preventDefault();
        const dataObj = this.refs.idForm.getFieldsValue();
        var newDataObj = {};
        var flag=false;
        this.refs.idForm.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            newDataObj = values;
            flag=true;
        });
        if (flag) {
            this.setState({
                newDataObj: newDataObj
            });
        }
        this.refs.idForm.resetFields();
        
    }
    handleSave(e) {
        e.preventDefault();
        let param = this.refs.table.getState().idsInfoList.idsList;
        if(this.refs.idForm.getFieldsValue().idNum){
            global.message.warning('请先点击新增！');
            return;
        }
        updateIdMgrList(param,this.props.registerPatientState.patientId||"");
    }
    render() {
        const options = this.state.options;
        // if(this.props.idsInfoList.show&&this.refs.idForm){
        //     this.refs.idForm.setFieldsValue({"idType":"请选择证件类型"});
        // }
        return (
            <div className={style["idMgr"]}>
                <IdList newDataObj={this.state.newDataObj} ref="table" />
                <div className={style["boundary"]} />
                <IdForm options={options} ref="idForm"/>
                <div className={style["idBtnDiv"]}>
                    <Button
                        type="primary"
                        className={style["bottonCls"]}
                        icon="plus"
                        onClick={this.handleAdd.bind(this)}
                    >
                        新增
                    </Button>
                    <Button
                        type="primary"
                        className={style["bottonCls"]}
                        icon="save"
                        onClick={this.handleSave.bind(this)}
                    >
                        保存
                    </Button>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { idsInfoList,registerPatientState } = state;
    return {
        idsInfoList,registerPatientState
    };
}
export default connect(mapStateToProps)(IdMgr);
