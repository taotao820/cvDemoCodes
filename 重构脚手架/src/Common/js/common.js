import React from "react";
import queryString from "query-string";
import HrbStore from "../../Reducer/hrbStore";

import message from "antd/lib/message";
import style from "antd/lib/message/style/css";
import style1 from "../css/static/message";
global.domainHis = `//${window.location.host}/his/`;
//global.host = "//118.190.8.227:3333/";
// global.host = "//118.190.8.228:3333/web/";
global.host = "//192.168.20.35:3333/";
global.token = window.sessionStorage.getItem('token');
global.printerName = window.localStorage.getItem('printerName');
global.toast = {
    sysErro: '系统异常'
};
/*new*/
//通过出生日期计算年龄
global.calculateAge = function(birthDate, isFormat) {
    var str = "";
    str = isFormat ? birthDate : birthDate.getFullYear() +
        "-" +
        (birthDate.getMonth() + 1) +
        "-" +
        birthDate.getDate();
    //将传入的日期参数整理成“1999-09-09”格式 再进行正则取值
    var r = str.match(
        /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
    );
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
    ) {
        var Y = new Date().getFullYear();
        var M = new Date().getMonth() + 1;
        var D = new Date().getDate();
    }
    var ageY = Y - r[1];
    var ageM = 0,
        ageD = 0;
    if (M - ~~r[3] < 0) {
        ageM = 12 + M - r[3];
        ageY = ageY - 1;
    } else {
        ageM = M - ~~r[3];
    }
    if (D - ~~r[4] < 0) {
        ageD =
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                0
            ).getDate() +
            D -
            r[4];
        if (ageM <= 0) {
            ageM = 12 - 1;
            ageY = ageY - 1
        } else {
            ageM = ageM - 1
        }
    } else {
        ageD = D - ~~r[4];
    }

    var ageObj = {
        ageYear: ageY,
        ageMonth: ageM,
        ageDay: ageD
    };
    return ageObj;
};
// 校验字符串方法
global.regExpString = (str, type) => {
        let regExp;
        switch (type) {
            case 'number':
                regExp = /^\d+$/;
                return regExp.test(str);
                // case 'abc':
                //     break;
            default:
                return false;
        }
    }
    //fetch get
global.get = function(url) {
    let result = fetch(url, {
        headers: {
            Accept: "application/json, text/plain, */*"
        }
    });
    return result;
};
global.fetchGet = (url, params, sucCb, cb1, cb2) => {
    fetch(`${url}&token=${global.token}&time=${new Date().getTime()}params`).then(res => {
        return res.json();
    }).then(data => {
        if (data.code == 0) {
            sucCb(data.data)
        } else if (data.code == 1) {
            if (cb1) cb1();
            global.message.error(data.msg);
        } else {
            if (cb2) cb2();
            global.message.error("系统异常");
            console.log(data.msg);
        }
    });
};
//填写表单时的校验 返回true或者false
global.regTest = function(regContents, regType) {
    let regFlag;
    switch (regType) {
        case "String":
            //姓名正则 （字母，数字）
            let username = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            regContents != "" && !username.test(regContents) ?
                (regFlag = true) :
                (regFlag = false);
            return regFlag;
        case "Number":
            //数字正则（输入为数字类型）
            let num = /^-?\d*\.?\d+$/;
            regContents != "" && !num.test(regContents) ?
                (regFlag = true) :
                (regFlag = false);
            return regFlag;
        default:
            return true;
    }
};
//全局信息提示
message.config({
    top: 100,
    duration: 2.5
})
global.message = message;
global.isIe8 = () => {
    let browser = navigator.appName;
    let version = navigator.appVersion.split(";");
    let trim_Version = version[1].replace(/[ ]/g, "");
    return (
        browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0"
    );
};
global.myLodop = getLodopIe(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
// if(global.isIe8()){
//     global.myLodop = getLodopIe(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
// }else{
//     setTimeout(function(){
//         global.myLodop = getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
//     },1000);
// }

function getLodopIe(oOBJECT, oEMBED) {
    let strHtml1 = "<font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    let strHtml2 = "<font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop.exe'>执行升级</a>,升级后请重新进入。</font>";
    let strHtml3 = "<br><font color='#FF00FF'>(注：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸载它)</font>";
    let LODOP = oEMBED;
    try {
        //判别IE浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            LODOP = oOBJECT;
        }
        if ((LODOP == null) || (typeof(LODOP.VERSION) == "undefined")) {
            if (navigator.userAgent.indexOf('Firefox') >= 0)
                document.documentElement.innerHTML = strHtml3 + document.documentElement.innerHTML;
            if (navigator.appVersion.indexOf("MSIE") >= 0) document.write(strHtml1);
            else document.documentElement.innerHTML = strHtml1 + document.documentElement.innerHTML;
            return;
        } else if (LODOP.VERSION < "6.0.1.0") {
            if (navigator.appVersion.indexOf("MSIE") >= 0) document.write(strHtml2);
            else document.documentElement.innerHTML = strHtml2 + document.documentElement.innerHTML;
            return;
        }
        //*****如下空白位置适合调用统一功能:*********
        LODOP.SET_LICENSES("上海京颐科技股份有限公司", "E6A8DF07FAE17DEFCFD458B87E83CA26", "", "");
        //*******************************************
        return LODOP;
    } catch (err) {
        document.documentElement.innerHTML = "Error:" + strHtml1 + document.documentElement.innerHTML;
        return LODOP;
    }
}
//fetch post公共方法
global.post = function(url, paramsObj) {
    let result = fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: paramsObj
    });
    return result;
};
// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
global.objToParams = function(obj) {
    /*for (let key in obj) {
        if (!obj[key] && key != "isExist" && key != "isMine") {
            obj[key] = "";
        }
    }*/
    let result = "";
    let item;
    for (item in obj) {
        result += "&" + item + "=" + encodeURIComponent(obj[item]);
    }
    if (result) {
        result = result.slice(1);
    }
    result = result.replace(/undefined/g, "");
    return result;
};
global.setCln = (size, style) => {
    let cln = {};
    switch (size) {
        case "small":
            cln.wrap = style["wrap"] + " " + style["wrapSma"];
            cln.span = style["span"] + " " + style["spanSma"];
            cln.item = style["item"] + " " + style["itemSma"];
            break;
        case "large":
            cln.wrap = style["wrap"] + " " + style["wrapLar"];
            cln.span = style["span"] + " " + style["spanLar"];
            cln.item = style["item"] + " " + style["itemLar"];
            break;
        default:
            cln.wrap = style["wrap"] + " " + style["wrapNor"];
            cln.span = style["span"] + " " + style["spanNor"];
            cln.item = style["item"] + " " + style["itemNor"];
            break;
    }
    return cln;
};
global.queryString = queryString;
global.getDayTime0 = date => {
    date = new Date(date);
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
    );
};
global.copyObj = function deepCopy(p, b) {
    //一个深克隆的方法
    let c = b || {};
    for (let i in p) {
        if (typeof p[i] === "object") {
            c[i] = p[i].constructor === Array ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
};
global.dateFormat = (t, formater) => {
    const time = new Date(t);
    const year = time.getFullYear();
    const month = `0${time.getMonth() + 1}`.slice(-2);
    const date = `0${time.getDate()}`.slice(-2);
    const hours = `0${time.getHours()}`.slice(-2);
    const minutes = `0${time.getMinutes()}`.slice(-2);
    const seconds = `0${time.getSeconds()}`.slice(-2);
    return formater
        .replace("YY", year)
        .replace("MM", month)
        .replace("DD", date)
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);
};
global.readCard = type => {
    let method = type == "身份证" ? "readidentity" : "readcard";
    return fetch(`http://127.0.0.1:50991/Service?method=${method}&time=${new Date().getTime()}`);
};
global.transCardInfo = (str, type) => {
    let arr = str.split("|");
    let patInfo = {};
    if (type == "社保卡") {
        patInfo.patientName = arr[8];
        if (arr[7]) {
            patInfo.idNum = arr[7];
            patInfo.dateOfBirth =
                arr[7].substr(6, 4) +
                "-" +
                arr[7].substr(10, 2) +
                "-" +
                arr[7].substr(12, 2);
            patInfo.age = Math.floor(
                (new Date().getTime() -
                    new Date(patInfo.dateOfBirth).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            );
        }
        if (arr[10] == 1) {
            patInfo.sex = "男";
        } else if (arr[10] == 2) {
            patInfo.sex = "女";
        }
        patInfo.idType = type;
    } else {
        patInfo.patientName = arr[0];
        if (arr[5]) {
            patInfo.idNum = arr[5];
            patInfo.dateOfBirth =
                arr[5].substr(6, 4) +
                "-" +
                arr[5].substr(10, 2) +
                "-" +
                arr[5].substr(12, 2);
            patInfo.age = Math.floor(
                (new Date().getTime() -
                    new Date(patInfo.dateOfBirth).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            );
        }
        if (arr[1]) patInfo.sex = arr[1];
        patInfo.idType = type;
    }
    return patInfo;
};
global.strMoneyTrans = num => {
    // 阿拉伯数字金钱转为大写
    let daXieM = new daxie();
    return daXieM.getDaXie(parseFloat(Number(num) / 100)); //显示大写
};
global.fixGetElementsByClassName = (className, element) => {
    let children = (element || document).getElementsByTagName('*');
    let elements = new Array();
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.className = child.className.replace(/[\r\n]/g, "");
        let classNames = child.className.split(' ');
        for (let j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
}

function daxie() {
    //定义大写数组
    this.values = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    this.digits = ["", "拾", "佰", "仟"];
}
daxie.prototype.getDaXie = function(money) {
    if (isNaN(money)) return ""; //如果不是数值型，直接返回空
    let number = Math.round(money * 100) / 100; //取数值的整数
    number = number.toString(10).split("."); //整数和小数分开
    let moneyInt = number[0]; //整数部分
    let len = moneyInt.length; //整数的长度
    if (
        len > 12 //长度如果超出范围
    )
        return "数值超出范围！支持的最大数为 999999999999.99!";
    let returnValue = this.millonTrans(moneyInt.slice(-4));
    if (
        len > 4 //多于万位
    )
        returnValue =
        this.millonTrans(moneyInt.slice(-8, -4)) +
        (moneyInt.slice(-8, -4) != "0000" ? "万" : "") +
        returnValue;
    if (
        len > 8 //多于亿位
    )
        returnValue =
        this.millonTrans(moneyInt.slice(-12, -8)) + "亿" + returnValue;
    if (returnValue != "") returnValue += "圆"; //添加最后一个字符
    if (number.length == 2) {
        //是否是带小数的金额
        let cok = number[1].split("");
        if (returnValue != "" || cok[0] != "0")
            returnValue +=
            this.values[parseInt(cok[0])] + (cok[0] != "0" ? "角" : ""); //十位数显示角
        if (cok.length >= 2) returnValue += this.values[parseInt(cok[1])] + "分"; //个位数显示分
    }
    if (
        returnValue != "" &&
        !/分$/.test(returnValue) //使用正则判断是否有小数
    )
        returnValue += "整";
    return returnValue;
};

daxie.prototype.millonTrans = function(strTemp) {
    let money = strTemp.split(""); //将金额转换为数组
    let mLength = money.length - 1; //金额的长度
    let returnValue = "";
    for (
        let i = 0; i <= mLength; i++ //遍历每个元素
    )
        returnValue +=
        this.values[parseInt(money[i])] +
        (money[i] != "0" ? this.digits[mLength - i] : "");
    returnValue = returnValue.replace(/零+$/, "").replace(/零{2,}/, "零"); //返回转换后的数值
    return returnValue;
};