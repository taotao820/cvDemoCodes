/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import classNames from "classnames";
import Form from "antd/lib/form";
import style2 from "antd/lib/form/style/css";
import Input from "antd/lib/input";
import style3 from "antd/lib/input/style/css";
import Row from "antd/lib/row";
import style4 from "antd/lib/row/style/css";
import Col from "antd/lib/col";
import style5 from "antd/lib/row/style/css";
import Select from "antd/lib/select";
import style6 from "antd/lib/select/style/css";
import Button from "antd/lib/button";
import style7 from "antd/lib/button/style/css";
//import FormSchemaUtils from "../../../Common/js/formSchemaUtils.js";表单解析工具 待完成
import FormComponent from "./formSection/formItem";
import { printPatEwm } from "../../../Action/register/registerActions";
import style from "./style";
const FormItem = Form.Item;
const createForm = Form.create;
class PatientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnShow: false,
            valuesObj: {}
        };
    }
    /**
   * 清空表单的值
   *
   * @param e
   */
    handleReset(e) {
        const date = global.dateFormat(new Date(), "YY-MM-DD");
        e.preventDefault();
        this.refs.formComponent.resetFields();
        this.refs.formComponent.setFieldsValue({
            patientId: this.props.schema[0].value,
            registerTime: date
        });
    }
    /**
   * 处理表单提交 处理校验
   *
   * @param e
   */
    handleSubmit(e) {
        e.preventDefault();
        let isExist=false;
        if(this.props.registerPatientState.permitId) isExist=true;
        this.refs.formComponent.validateFields((errors, values) => {
            if (!!errors) {
                if(errors.hasOwnProperty("dateOfBirthString")&&errors.dateOfBirthString.errors[0].message=="dateOfBirthString need to revalidate"){
                    values.dateOfBirthString = global.dateFormat(values.dateOfBirthString,"YY-MM-DD");
                    values.isExist=isExist;
                    this.props.parentHandleSubmit(values);
                }else{
                    return;   
                }
            }else{
                values.dateOfBirthString = global.dateFormat(values.dateOfBirthString,"YY-MM-DD");
                values.isExist=isExist;
                this.props.parentHandleSubmit(values);
            }
        });
        //const oldObj = this.refs.formComponent.getFieldsValue();
    }
    /**
   * 关闭表单
   *
   * @param e
   */
    handleClose(e) {
        e.preventDefault();
        this.props.parentHandleClose();
    }
    /**
   * 打印二维码 TODO
   *
   * @param e
   */
    handlePrint(patientId, e) {
        printPatEwm(patientId);
        e.preventDefault();
    }
    handleCard(e) {
        global.readCard("身份证").then(res => {
            return res.json();
        }).then(data => {
            if (data.retCode == 0) {
                let cardObj = global.transCardInfo(data.retValue, "身份证");
                this.refs.formComponent.setFieldsValue({
                    patName: cardObj.patientName,
                    idNum: cardObj.idNum,
                    idType: "身份证",
                    sex: cardObj.sex,
                    dateOfBirthString: new Date(cardObj.dateOfBirth)
                });
                this.refs.formComponent.validateFields(["idNum"]);
            } else{
                global.message.error(data.retValue);
            }
        });
    }
    render() {
        const { schema, registerPatientState } = this.props;
        const date = global.dateFormat(new Date(), "YY-MM-DD");
        let flag = false;
        let stateFlag=true;
        if (
            registerPatientState.values &&
            registerPatientState.permitId &&
            this.refs.formComponent &&
            registerPatientState.state != "Success" &&
            registerPatientState.state != "Fail"
        ) {
            flag = true;
            const values = registerPatientState.values;
            let ageObj = {};
            if (values.dateOfBirth) {
                ageObj = global.calculateAge(new Date(values.dateOfBirth),false);
                this.refs.formComponent.setFieldsValue({
                    ageYear: ageObj.ageYear,
                    ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                    ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay
                });
            }
            this.refs.formComponent.setFieldsValue({
                dateOfBirthString: new Date(values.dateOfBirth),
                idNum: values.idNum || "",
                idType: values.idType || "",
                insType: values.insType || "",
                national: values.national || "",
                patientId: values.patientId || "",
                patName: values.patientName || "",
                phonecall: values.phoneNo || "",
                sex: values.sex || "",
                homeAdd: values.homeAdd || "",
                discount: values.discount || "",
                postCode: values.postCode || "",
                professional: values.professional || "",
                email: values.email || "",
                culturalDegree: values.culturalDegree || "",
                maritalStatus: values.maritalStatus || "",
                relation: values.relation || "",
                unitName: values.unitName || "",
                contacter: values.contacter || "",
                contacterIdNum: values.contacterIdNum || "",
                addType:values.addType || "",
                isExist: true
            });
        }
        if(registerPatientState.state == "Success"||registerPatientState.state == "Fail") {
            stateFlag=false;
            }
        return (
            <div id="regisForm">
                <Button
                    className={style["btn-card"]}
                    type="primary"
                    icon="credit-card"
                    onClick={this.handleCard.bind(this)}
                >
                    读身份证
                </Button>
                <FormComponent
                    schema={schema}
                    ref="formComponent"
                    flag={flag} stateFlag={stateFlag}
                />
                <div className={style["footer-botton"]}>
                    <Button
                        icon="delete"
                        type="primary"
                        className={style["botton-cls"]}
                        onClick={this.handleReset.bind(this)}
                    >
                        清空
                    </Button>
                    <Button
                        className={style["botton-cls"]}
                        type="primary"
                        icon="save"
                        onClick={this.handleSubmit.bind(this)}
                    >
                        保存
                    </Button>

                    {registerPatientState.permitId
                        ? <Button
                              type="primary"
                              icon="file-text"
                              className={style["botton-cls"]}
                              onClick={this.handlePrint.bind(
                                  this,
                                  registerPatientState.patientId
                              )}
                          >
                              打印
                          </Button>
                        : <Button
                              icon="file-text"
                              className={style["botton-gray-cls"]}
                              disabled
                          >
                              打印
                          </Button>}
                    <Button
                        type="primary"
                        icon="cross"
                        className={style["botton-cls"]}
                        onClick={this.handleClose.bind(this)}
                    >
                        关闭
                    </Button>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { registerPatientState } = state;
    return {
        registerPatientState
    };
}
export default connect(mapStateToProps)(PatientInfo);
