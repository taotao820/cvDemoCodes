/**
 * Created by xuhuitao on 2017/05/12.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "../style";
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
import Radio from "antd/lib/radio";
import style7 from "antd/lib/radio/style/css";
import DatePicker from "antd/lib/date-picker";
import style8 from "antd/lib/date-picker/style/css";
import style9 from "../../../../Common/css/static/form.scss";
import {
    changeIdState,
    storeFormValue
} from "../../../../Action/register/registerActions";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.now = new Date();
        this.state={
            inputstate:false
        }
        this.days = new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            0
        ).getDate();
    }
    componentDidMount() {
        const date = global.dateFormat(new Date(), "YY-MM-DD");
        this.props.form.setFieldsValue({
            registerTime: date
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.schema != nextProps.schema&&this.props.stateFlag) {
            this.props.form.setFieldsValue({
                patientId: nextProps.schema[0].value,
                isExist: false
            });
        }
        if (
            this.props.flag &&
            this.props.form &&
            this.props.form.getFieldsValue().idNum
        ) {
            this.queryInfoByIdNum();
        }
    }
    queryInfoByIdNum() {
        const { schema, form } = this.props;
        const values = form.getFieldsValue();
        let idType = encodeURIComponent(values.idType);
        let url = `${global.host}patient/checkIdNum?token=${global.token}&idNum=${values.idNum}&idType=${idType}&time=${new Date().getTime()}`;
        let result = global.get(url);
        result
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.code == 0 && data.data) {
                    global.message.warning("该档案已存在！");
                    this.setState({
                        inputstate:true
                    });
                    changeIdState(data.data.patientId);
                    var b=data.data.dateOfBirthString;
                    var birthDate = new Date(b.substring(0,4),~~b.substring(5,7)-1,b.substring(8,10));
                    var ageObj = global.calculateAge(birthDate, false);
                    form.setFieldsValue({
                        ageYear: ageObj.ageYear,
                        ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                        ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                        dateOfBirthString: birthDate ||
                            form.getFieldsValue().dateOfBirthString,
                        discount: data.data.discount ||
                            form.getFieldsValue().discount,
                        homeAdd: data.data.homeAdd ||
                            form.getFieldsValue().homeAdd,
                        insType: data.data.insType ||
                            form.getFieldsValue().insType,
                        national: data.data.national ||
                            form.getFieldsValue().national,
                        nationality: data.data.nationality ||
                            form.getFieldsValue().nationality,
                        patName: data.data.patName ||
                            form.getFieldsValue().patName,
                        patientId: data.data.patientId ||
                            form.getFieldsValue().patientId,
                        phonecall: data.data.phonecall ||
                            form.getFieldsValue().phonecall,
                        sex: data.data.sex || form.getFieldsValue().sex,
                        postCode: data.data.postCode ||
                            form.getFieldsValue().postCode,
                        professional: data.data.professional ||
                            form.getFieldsValue().professional,
                        email: data.data.email || form.getFieldsValue().email,
                        culturalDegree: data.data.culturalDegree ||
                            form.getFieldsValue().culturalDegree,
                        maritalStatus: data.data.maritalStatus ||
                            form.getFieldsValue().maritalStatus,
                        relation: data.data.relation ||
                            form.getFieldsValue().relation,
                        unitName: data.data.unitName ||
                            form.getFieldsValue().unitName,
                        addType: data.data.addType ||
                            form.getFieldsValue().addType,
                        ageType: data.data.ageType ||
                            form.getFieldsValue().ageType,
                        contacter: data.data.contacter ||
                            form.getFieldsValue().contacter,
                        contacterIdNum: data.data.contacterIdNum ||
                            form.getFieldsValue().contacterIdNum,
                        isExist: true
                    });
                } else {
                    if (form.getFieldsValue().idType == "身份证" &&value.length == "18") {
                        var birth =
                            value.substring(6, 10) +
                            "-" +
                            value.substring(10, 12) +
                            "-" +
                            value.substring(12, 14);
                        var ageObj = global.calculateAge(birth, true);
                        var sex = parseInt(value.substr(16, 1)) % 2 == 1
                            ? "男"
                            : "女";                        
                        form.setFieldsValue({
                            dateOfBirthString: new Date(birth),
                            ageYear: ageObj.ageYear,
                            ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                            ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                            sex: sex
                        });
                    }
                    if (form.getFieldsValue().idType == "身份证" &&value.length == "15"){
                        var birth =
                            "19"+value.substring(6, 8) +
                            "-" +
                            value.substring(8, 10) +
                            "-" +
                            value.substring(10, 12);
                        var ageObj = global.calculateAge(birth, true);
                        var sex = parseInt(value.substr(14, 1)) % 2 == 1
                            ? "男"
                            : "女";                        
                        form.setFieldsValue({
                            dateOfBirthString: new Date(birth),
                            ageYear: ageObj.ageYear,
                            ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                            ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                            sex: sex
                        });
                    }
                    form.setFieldsValue({
                        isExist: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    checkIdNum(rule, value, callback) {
        if (!value || value == "") {
            callback();
            return;
        } else {
            const { schema, form } = this.props;
            let idReg = /^[0-9a-zA-Z]+$/;
            if (idReg.test(value)) {
                if(form.getFieldsValue().idType=="身份证"&&value.length>18) callback("身份证位数不能大于18位！");
                if (!form.getFieldsValue().idType) {
                    form.setFieldsValue({
                        idType: "身份证"
                    });
                }
                let idType = form.getFieldsValue().idType;
                idType = encodeURIComponent(idType);
                let url = `${global.host}patient/checkIdNum?token=${global.token}&idNum=${value}&idType=${encodeURIComponent(idType)}&time=${new Date().getTime()}`;
                let result = global.get(url);
                result
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        //返回状态成功并且有patientId并且和表单中的patientId不一致 则表示该病人已存在=》isExist为true 拿取默认数据
                        if (
                            data.code == 0 &&
                            data.data
                        ) {
                            global.message.warning("该档案已存在！");
                            this.setState({
                                inputstate:true
                            });
                            changeIdState(data.data.patientId);
                            var b=data.data.dateOfBirthString;
                            var birthDate = new Date(b.substring(0,4),~~b.substring(5,7)-1,b.substring(8,10));
                            
                            var ageObj = global.calculateAge(birthDate, false);
                            form.setFieldsValue({
                                ageYear: ageObj.ageYear,
                                ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                                ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                                dateOfBirthString: birthDate || form.getFieldsValue().dateOfBirthString,
                                discount: data.data.discount ||
                                    form.getFieldsValue().discount,
                                homeAdd: data.data.homeAdd ||
                                    form.getFieldsValue().homeAdd,
                                insType: data.data.insType ||
                                    form.getFieldsValue().insType,
                                national: data.data.national ||
                                    form.getFieldsValue().national,
                                nationality: data.data.nationality ||
                                    form.getFieldsValue().nationality,
                                patName: data.data.patName ||
                                    form.getFieldsValue().patName,
                                patientId: data.data.patientId ||
                                    form.getFieldsValue().patientId,
                                sex: data.data.sex || form.getFieldsValue().sex,
                                postCode: data.data.postCode ||
                                    form.getFieldsValue().postCode,
                                professional: data.data.professional ||
                                    form.getFieldsValue().professional,
                                email: data.data.email ||
                                    form.getFieldsValue().email,
                                culturalDegree: data.data.culturalDegree ||
                                    form.getFieldsValue().culturalDegree,
                                maritalStatus: data.data.maritalStatus ||
                                    form.getFieldsValue().maritalStatus,
                                relation: data.data.relation ||
                                    form.getFieldsValue().relation,
                                unitName: data.data.unitName ||
                                    form.getFieldsValue().unitName,
                                addType: data.data.addType ||
                                    form.getFieldsValue().addType,
                                contacter: data.data.contacter ||
                                    form.getFieldsValue().contacter,
                                contacterIdNum: data.data.contacterIdNum ||
                                    form.getFieldsValue().contacterIdNum,
                                phonecall: data.data.phonecall ||
                                    form.getFieldsValue().phonecall,
                                isExist: true
                            });
                            callback(); //检查身份证号是否唯一
                        } else {
                            if (form.getFieldsValue().idType == "身份证" &&value.length == "18") {
                                var birth =
                                    value.substring(6, 10) +
                                    "-" +
                                    value.substring(10, 12) +
                                    "-" +
                                    value.substring(12, 14);
                                var ageObj = global.calculateAge(birth, true);
                                var sex = parseInt(value.substr(16, 1)) % 2 == 1
                                    ? "男"
                                    : "女";
                                form.setFieldsValue({
                                    dateOfBirthString: new Date(birth),
                                    ageYear: ageObj.ageYear,
                                    ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                                    ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                                    sex: sex
                                });
                            }
                            if (form.getFieldsValue().idType == "身份证" &&value.length == "15"){
                                var birth =
                                    "19"+value.substring(6, 8) +
                                    "-" +
                                    value.substring(8, 10) +
                                    "-" +
                                    value.substring(10, 12);
                                var ageObj = global.calculateAge(birth, true);
                                var sex = parseInt(value.substr(14, 1)) % 2 == 1
                                    ? "男"
                                    : "女";                        
                                form.setFieldsValue({
                                    dateOfBirthString: new Date(birth),
                                    ageYear: ageObj.ageYear,
                                    ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                                    ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                                    sex: sex
                                });
                            }
                            form.setFieldsValue({
                                isExist: false
                            });
                            callback();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                callback("请输入有效证件号");
            }
        }
    }
    checkBirthday(rule, value, callback) {
        if (value && value.getTime() >= Date.now()) {
            callback(new Error("出生日期不能大于当前日期!"));
        } else {
            callback();
        }
    }
    blurS(e) {
        let dom = document.getElementById("fileForm");
        if (
            dom &&
            global.fixGetElementsByClassName("ant-select-open", dom).length > 0
        )
            global.fixGetElementsByClassName("ant-select-open", dom)[0].click();
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
            isFieldValidating,
            getFieldsValue,
            getFieldValue
        } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 }
        };
        const { schema, form } = this.props;
        const _this = this;
        const disabledDate = function(current) {
            return current && current.getTime() > Date.now();
        };
        const birthdayProps = getFieldProps(schema[2].key, {
            getValueFromEvent: (value, timeString) => {
                var ageObj = global.calculateAge(timeString, true);
                form.setFieldsValue({
                    ageYear: ageObj.ageYear,
                    ageMonth: ageObj.ageYear > 6 ? "" : ageObj.ageMonth,
                    ageDay: ageObj.ageYear >= 1? "" : ageObj.ageDay,
                });
                return value;
            },
            rules: [
                {
                    required: true,
                    type: "date",
                    message: "请输入出生日期"
                },
                {
                    validator: this.checkBirthday.bind(this)
                }
            ]
        });
        const regIdNum = getFieldProps(schema[18].key, {
            getValueFromEvent: obj => {
                return obj.target.value;
            },
            //validate:[{
            //rules: [{ validator: this.checkIdNum.bind(this), message: '请输入正确的...' }],trigger: ['onBlur']}]
            validate:[{rules: [{ validator: this.checkIdNum.bind(this) }],
            trigger:'onBlur'}]
            
        });
        const ageYear = getFieldProps("ageYear", {
            getValueFromEvent: obj => {
                if (global.regTest(obj.target.value, "Number")) return "";
                var y = ~~new Date().getFullYear() - ~~obj.target.value;
                var diffm = form.getFieldsValue().ageMonth || 0;
                var m = ~~new Date().getMonth() + 1 - ~~diffm;
                var diffd = form.getFieldsValue().ageDay || 0;
                var d = ~~new Date().getDate() - ~~diffd;
                form.setFieldsValue({
                    dateOfBirthString: new Date(y, m - 1, d)
                });
                return obj.target.value;
            }
        });
        const ageMonth = getFieldProps("ageMonth", {
            getValueFromEvent: obj => {
                if (global.regTest(obj.target.value, "Number")) return "";
                var m = ~~_this.now.getMonth() + 1 - ~~obj.target.value;
                var diffy = form.getFieldsValue().ageYear || 0;
                var y = ~~new Date().getFullYear() - ~~diffy;
                var diffd = form.getFieldsValue().ageDay || 0;
                var d = ~~new Date().getDate() - ~~diffd;
                if (m <= 0) {
                    m = 12 + m;
                    y = y - 1;
                }
                form.setFieldsValue({
                    dateOfBirthString: new Date(y, m - 1, d)
                });
                return obj.target.value;
            }
        });
        const ageDay = getFieldProps("ageDay", {
            getValueFromEvent: obj => {
                if (global.regTest(obj.target.value, "Number")) return "";
                if (obj.target.value) {
                    var diffTime = ~~obj.target.value * 1000 * 24 * 60 * 60;
                    var d=new Date();
                    var nowDateY = d.getFullYear();
                    var nowDateM = d.getMonth();
                    var nowDateD = d.getDate();
                    var m=form.getFieldsValue().ageMonth?~~form.getFieldsValue().ageMonth:~~0;
                    var y=form.getFieldsValue().ageYear?~~form.getFieldsValue().ageYear:~~0;
                    /*var nowDateY = form.getFieldsValue().ageYear?form.getFieldsValue().ageYear:new Date().getFullYear();
                    var nowDateM = form.getFieldsValue().ageMonth?form.getFieldsValue().ageMonth:new Date().getMonth();*/
                    //获取出生日期年月
                    var birthY = form.getFieldsValue().dateOfBirthString?form.getFieldsValue().dateOfBirthString.getFullYear():nowDateY;
                    var birthM = form.getFieldsValue().dateOfBirthString?form.getFieldsValue().dateOfBirthString.getMonth():nowDateM;
                    var date = new Date(new Date(nowDateY-y, nowDateM-m, nowDateD) - diffTime);
                    form.setFieldsValue({
                        dateOfBirthString: date
                    });
                } else {
                   
                    var diffy = form.getFieldsValue().ageYear || 0;
                    var y = ~~new Date().getFullYear() - ~~diffy;
                    var diffm = form.getFieldsValue().ageMonth || 0;
                    var m = ~~new Date().getMonth() + 1 - ~~diffm;
                    var nowDateD = new Date().getDate();
                    form.setFieldsValue({
                        dateOfBirthString: new Date(y, m - 1, nowDateD)
                    });
                }
                return obj.target.value;
            }
        });
        return (
            <Form horizontal className={style["clearfix"]}>
                <Row gutter={16}>
                    <FormItem label={schema[0].title} {...formItemLayout}>
                        <Input
                            size="default"
                            disabled
                            {...getFieldProps(schema[0].key)}
                        />
                    </FormItem>
                    <FormItem label={schema[9].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="身份证"
                            defaultValue="请选择证件类型"
                            style={{ width: 142 }}
                            disabled={this.state.inputstate}
                            {...getFieldProps(schema[9].key, {})}
                        >
                            {schema[9].options
                                ? schema[9].options.map((item, index) => {
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
                    <FormItem label={schema[18].title} {...formItemLayout}>
                        <Input disabled={this.state.inputstate}
                            placeholder="请输入证件号"
                            size="default"
                            {...regIdNum}
                        />
                    </FormItem>
                    {/*第一行结束*/}
                    {/*第二行开始*/}
                    <FormItem
                        label={schema[1].title}
                        {...formItemLayout}
                        required
                    >
                        <Input
                            placeholder="请输入姓名"
                            size="default" disabled={this.state.inputstate}
                            {...getFieldProps(schema[1].key, {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入姓名"
                                    }
                                ]
                            })}
                        />
                    </FormItem>
                    <FormItem
                        label={schema[10].title}
                        {...formItemLayout}
                        required
                    >
                        <Select disabled={this.state.inputstate}
                            onBlur={this.blurS.bind(this)}
                            defaultValue="请选择性别"
                            placeholder="请选择性别"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[10].key, {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择性别"
                                    }
                                ]
                            })}
                        >
                            {schema[10].options
                                ? schema[10].options.map((item, index) => {
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
                    <FormItem
                        label={schema[19].title}
                        {...formItemLayout}
                        {...getFieldProps("ageNumber")}
                    >
                        <InputGroup>
                            <Col span="5">
                                <Input {...ageYear} style={{ width: 30 }} disabled={this.state.inputstate} />
                            </Col>
                            <Col span="3">
                                <p className="ant-form-split">岁</p>
                            </Col>
                            <Col span="5">
                                <Input {...ageMonth} style={{ width: 30 }} disabled={this.state.inputstate} />
                            </Col>
                            <Col span="3">
                                <p className="ant-form-split">月</p>
                            </Col>
                            <Col span="5">
                                <Input {...ageDay} style={{ width: 30 }} disabled={this.state.inputstate} />
                            </Col>
                            <Col span="3">
                                <p className="ant-form-split">天</p>
                            </Col>
                        </InputGroup>
                    </FormItem>
                    {/*第二行end*/}
                    {/*第三行start*/}
                    <FormItem
                        label={schema[2].title}
                        {...formItemLayout}
                        required
                    >
                        <DatePicker
                            disabledDate={disabledDate} disabled={this.state.inputstate}
                            {...birthdayProps}
                        />
                    </FormItem>
                    <FormItem
                        label={schema[11].title}
                        {...formItemLayout}
                        required
                    >
                        <Select
                            onBlur={this.blurS.bind(this)}
                            defaultValue="请选择费用类别"
                            placeholder="请选择费用类别"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[11].key, {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择费用类别"
                                    }
                                ]
                            })}
                        >
                            {schema[11].options
                                ? schema[11].options.map((item, index) => {
                                      return (
                                          <Option
                                              key={index}
                                              value={item.typeName}
                                          >
                                              {item.typeName}
                                          </Option>
                                      );
                                  })
                                : null}
                        </Select>
                    </FormItem>
                    <FormItem label={schema[20].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择优惠类别"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[20].key, {})}
                        >
                            {schema[20].options
                                ? schema[20].options.map((item, index) => {
                                      return (
                                          <Option
                                              key={index}
                                              value={item.discountName}
                                          >
                                              {item.discountName}
                                          </Option>
                                      );
                                  })
                                : null}
                        </Select>
                    </FormItem>

                    {/*第三行end*/}
                    {/*第四行start*/}
                    <FormItem label={schema[3].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入家庭邮编"
                            size="default"
                            {...getFieldProps(schema[3].key)}
                        />
                    </FormItem>
                    <FormItem
                        label={schema[12].title}
                        {...formItemLayout}
                        required
                    >
                        <Input
                            placeholder="请输入家庭住址"
                            style={{ width: 386 }}
                            {...getFieldProps(schema[12].key, {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入家庭地址"
                                    }
                                ]
                            })}
                        />
                    </FormItem>
                    <div />
                    {/*第四行end*/}
                    {/*第五行start*/}
                    <FormItem label={schema[4].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入联系人"
                            size="default"
                            {...getFieldProps(schema[4].key)}
                        />
                    </FormItem>
                    <FormItem label={schema[13].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入联系电话"
                            size="default"
                            {...getFieldProps(schema[13].key, {})}
                        />
                    </FormItem>
                    <div />
                    {/*第五行end*/}
                    {/*第六行start*/}

                    <FormItem label={schema[5].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入联系人证件号"
                            size="default"
                            {...getFieldProps(schema[5].key)}
                        />
                    </FormItem>
                    <FormItem label={schema[14].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入关系"
                            size="default"
                            {...getFieldProps(schema[14].key)}
                        />
                    </FormItem>
                    <div />
                    {/*第六行end*/}
                    {/*第七行start*/}
                    <FormItem label={schema[6].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入联系人电子邮箱"
                            size="default"
                            {...getFieldProps(schema[6].key, {
                                validate: [
                                    {
                                        rules: [
                                            {
                                                type: "email",
                                                message: "请输入正确的邮箱地址"
                                            }
                                        ],
                                        trigger: ["onBlur"]
                                    }
                                ]
                            })}
                        />
                    </FormItem>
                    <FormItem label={schema[15].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择职业名称"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[15].key, {})}
                        >
                            {schema[15].options
                                ? schema[15].options.map((item, index) => {
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
                    <FormItem label={schema[24].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择文化程度"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[24].key)}
                        >
                            {schema[24].options
                                ? schema[24].options.map((item, index) => {
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
                    {/*第七行end*/}
                    {/*第八行start*/}
                    <FormItem label={schema[7].title} {...formItemLayout}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择国籍"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[7].key, {
                                initialValue: "中国"
                            })}
                            //onChange={this.handleChange}
                        >
                            {schema[7].options
                                ? schema[7].options.map((item, index) => {
                                      return (
                                          <Option
                                              key={item.INPUTCPY}
                                              value={item.CONTENTS}
                                          >
                                              {item.CONTENTS}
                                          </Option>
                                      );
                                  })
                                : null}
                        </Select>
                    </FormItem>
                    <FormItem label={schema[16].title} {...formItemLayout}>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择民族"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[16].key, {})}
                        >
                            {schema[16].options
                                ? schema[16].options.map((item, index) => {
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
                    <FormItem label={schema[25].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择婚姻状况"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[25].key)}
                        >
                            {schema[25].options
                                ? schema[25].options.map((item, index) => {
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
                    {/*第八行end*/}
                    {/*第九行start*/}
                    <FormItem label={schema[8].title} {...formItemLayout}>
                        <Input
                            placeholder="请输入单位名称"
                            size="default"
                            {...getFieldProps(schema[8].key)}
                        />
                    </FormItem>
                    <FormItem label={schema[17].title} {...formItemLayout}>
                        <Select
                            onBlur={this.blurS.bind(this)}
                            placeholder="请选择地址类别"
                            style={{ width: 142 }}
                            {...getFieldProps(schema[17].key)}
                        >
                            {schema[17].options
                                ? schema[17].options.map((item, index) => {
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
                    <FormItem label={schema[26].title} {...formItemLayout}>
                        <Input
                            size="default"
                            {...getFieldProps("registerTime")}
                            disabled
                        />
                    </FormItem>
                    <FormItem {...getFieldProps("isExist")}>
                        <p />
                    </FormItem>
                </Row>
            </Form>
        );
    }
}
FormComponent = Form.create({})(FormComponent);
export default FormComponent;
