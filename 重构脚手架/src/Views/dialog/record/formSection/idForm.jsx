import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import classNames from "classnames";
import style from "../style.scss";
import Form from "antd/lib/form";
import style2 from "antd/lib/form/style/css";
import Input from "antd/lib/input";
import style3 from "antd/lib/input/style/css";
import Select from "antd/lib/select";
import style4 from "antd/lib/select/style/css";
import Button from "antd/lib/button";
import style5 from "antd/lib/button/style/css";
import style6 from "../../../../Common/css/static/form.scss";
const FormItem = Form.Item;
class IdForm extends Component {
    constructor(props) {
        super(props);
    }
    checkIdNum(rule, value, callback){
        const form = this.props.form;
        if(form.getFieldsValue().idType=="身份证"&&value.length>18){
            callback("请输入有效证件号");
        }else{
            callback();
        }
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
            isFieldValidating,
            setFieldsValue,
            getFieldValue,
            getFieldsValue
        } = this.props.form;
        let btnCls = style["botton-cls"];
        const options = this.props.options;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const regIdNum = getFieldProps("idNum", {
            validate:[{rules: [{ validator: this.checkIdNum.bind(this) },{required: true,message: "请输入证件号"}],
            trigger:'onBlur'}]
            
        });
        return (
            <div className={style["idForm"]} id="idForm">
                <Form horizontal>
                    <FormItem label="证件类别" {...formItemLayout} required>
                        <Select
                            size="large"
                            defaultValue="请选择证件类型"
                            style={{ width: 220 }}
                            {...getFieldProps("idType", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择证件类型"
                                    }
                                ],
                                initialValue:"院内一卡通"
                            })}
                        >
                            {options
                                ? options.map((item, index) => {
                                      return (
                                          <Option
                                              key={index}
                                              value={item.CONTENTS}
                                          >
                                              {item.CONTENTS}
                                          </Option>
                                      );
                                  })
                                : null}
                        </Select>
                    </FormItem>
                    <FormItem label="证件号" {...formItemLayout} required>
                        <Input
                            placeholder="请输入证件号"
                            style={{ width: 220 }}
                            {...regIdNum}
                        />
                    </FormItem>

                    <FormItem
                        // id="control-textarea"
                        label="备注"
                        {...formItemLayout}
                    >
                        <Input
                            type="textarea"
                            placeholder="请输入备注"
                            style={{ width: 220 }}
                            rows="6"
                            {...getFieldProps("txt")}
                        />
                    </FormItem>
                </Form>

            </div>
        );
    }
}
IdForm = Form.create()(IdForm);
export default IdForm;
