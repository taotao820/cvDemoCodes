import HrbStore from "../../Reducer/hrbStore";
import {
    CHECK_DATE,
    LOAD_DATE,
    LOAD_REGCODELIST,
    FILTER_REGCODELIST,
    LOAD_REGLIST,
    LOAD_IDMGR_OPTIONS,
} from "../../Common/js/constants";

let filterKey = ["time", "type", "dept", "docName"];

export const getPatientInfoById = data => {
    var patientId = data;
    fetch(`${global.host}patient/findByCardNo?token=${global.token}&cardNo=${patientId}&time=${new Date().getTime()}`).then(res => {
            return res.json();
        }).then(data => {
            if (data.code == 0) {
                const params = {
                    patientName: data.data.patientName,
                    age: data.data.age || "",
                    sex: data.data.sex,
                    idType: data.data.idType,
                    idNum: data.data.idNum,
                    patientId: data.data.patientId
                };
                loadRegInfo(params);
                const obj = data.data;
                obj.patientId = patientId;
                HrbStore.dispatch({
                    type: "SHOW_FORM_VALUES",
                    data: obj
                });
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
}
export const changeIdState = data => {
    HrbStore.dispatch({
        type: "READ_CARD_PATIENT",
        data: data
    });
}
export const printPatEwm = (patientId) => {
    let url = `${global.host}patient/getCode?token=${global.token}&patientId=${patientId}&time=${new Date().getTime()}`;
    let result = global.get(url);
    result.then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                var data = data.data;
                var src = (!!data.base64String) ? `data:image/jpeg;base64,${data.base64String}` : ``;
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                    " " + date.getHours() + seperator2 + date.getMinutes() +
                    seperator2 + date.getSeconds();
                var printTime = global.dateFormat(new Date(), "YY-MM-DD hh:mm:ss");
                var isSelf = data.isBenBu ? "本部" : "非本部";
                var printstyle = "<style> * {font-family: '宋体';margin-left:15px; font-size:11px;margin-top:0px;} body{margin:5px 5px;} div{width:200px;height:20px;margin-top:5px;} img{border: 1px solid black; display:block;width:160px;height:50px;margin-top:8px;} span{width:180px;height:0.1px;display:block;background:#000}</style>";
                var printtable = "<body><div>" + data.hosName + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + isSelf + "</div><span></span><img src=" + src + "><div>" + "姓名：" + data.patientName + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "性别：" + data.sex + "</div><span></span><div>" + "打印时间：" + currentdate + "</div></div></body>";
                if (global.myLodop) {
                    global.myLodop.SET_PRINT_PAGESIZE(1, '60mm', '40mm', "SET_PRINT_PAGESIZE");
                    global.myLodop.ADD_PRINT_HTM(0, 0, "60mm", "40mm", printstyle + printtable);
                    global.myLodop.PRINT();
                }

            } else {
                global.message.error("系统异常");
            }
        }).catch(err => console.log(err));
}
export const setDateCheck = (index, dateList) => {
    return {
        type: CHECK_DATE,
        checked: index,
        checkedDate: dateList[index].day
    };
};
export const loadRegInfo = info => {
    if (info.regId) {
        HrbStore.dispatch({ type: "RELOAD" });
        HrbStore.dispatch({ type: "EDITE_TEMPDATA", data: { id: info.id, regId: info.regId, code: info.scheduleId, date: info.visitDate } });
    }
    if (info.payWayName) HrbStore.dispatch({ type: "UPDATE_PAYWAY", data: { key: info.payWayName, value: info.payWayCode } });
    if (info.chargeType) HrbStore.dispatch({ type: "UPDATE_CHARGE_TYPE", data: { key: info.chargeType, value: info.chargeCode } });
    HrbStore.dispatch({
        type: "EDITE_PATINFO",
        patientInfo: {
            patientName: info.patientName,
            age: info.age,
            sex: info.sex,
            idType: info.idType,
            idNum: info.idNum,
            patientId: info.patientId
        }
    });
    if (info.schId) {
        let filterTemp = Object.assign({}, HrbStore.getState().regCodeList.filters);
        filterTemp.filtesRight['type'].currVal = info.regTypeName;
        filterTemp.filtesRight['dept'].currVal = info.deptName;
        filterTemp.filtesRight['docName'].currVal = info.doctorName;
        filterTemp.filtesRight['time'].currVal = info.duration;
        HrbStore.dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
        HrbStore.dispatch({
            type: 'CHECK_DATE',
            checked: 0,
            checkedDate: new Date(info.visitDate)
        })
        HrbStore.dispatch({
            type: "UPDATE_CARDLIST",
            data: [{
                id: info.schId || '',
                dept: info.deptName,
                docName: info.doctorName,
                type: info.regTypeName,
                time: info.duration,
                date: info.visitDate
            }]
        });
    }
};
export const reloadPage = () => {
    // fetchInvoice();
    fetchChargeOptions();
    let day = new Date();
    fetchCardList(day);
    HrbStore.dispatch({
        type: "CHECK_DATE",
        checked: 0,
        checkedDate: new Date().getTime()
    });
};
export const loadDates = index => {
    let dateList = getDates();
    return {
        type: LOAD_DATE,
        checked: index,
        dateList: dateList,
        checkedDate: dateList[0].day
    };
};
export const getSelectOptions = (filters, regCodeList, selectType) => {
    let list = regCodeList.codeList;
    list = filterList(list, filters);
    list = getFilter(selectType, list);
    list.unshift({ key: '全部', value: '' })
    return list;
}
export const fetchCardList = date => {
    fetch(`${global.host}outpatient/schedule/doctorScheduling?token=${global.token}&day=${global.dateFormat(date, "YY-MM-DD")}&time=${new Date().getTime()}`).then(res => {
            return res.json();
        }).then(data => {
            if (data.code == 0) {
                let arr = [];
                data.data.map((item, index) => {
                    item.time = item.duration;
                    item.type = item.regTypeName;
                    item.dept = item.deptName;
                    item.docName = (item.doctorName)?item.doctorName:(item.regTypeName == '急诊')?'急诊':'门诊';
                    item.number = item.availableTokens;
                    item.code = item.scheduleId;
                    if (item.availableTokens > 0) arr.push(item);
                });
                HrbStore.dispatch(loadCodeData(arr));
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
export const setInvoiceNo = (takeid, newInvoiceNo) => {
    fetch(`${global.host}invoice/setCurrentInvoiceNo?token=${global.token}&takeid=${takeid}&currentnum=${newInvoiceNo}`).then(res => {
            return res.json();
        }).then(data => {
            if (data.code == 0) {
                HrbStore.dispatch({ type: 'HIDE_CHANGEINVOICE' });
                HrbStore.dispatch({ type: 'HIDE_COVER' });
                fetchInvoice();
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
export const loadCodeData = codeList => {
    // if (codeList.length == 0) return;
    let filterArr = {};
    filterKey.map(item => {
        filterArr[item] = {};
        filterArr[item].type = item;
        filterArr[item].list = getFilter(item, codeList);
        filterArr[item].currVal = "";
        filterArr[item].list.unshift({ key: '全部', value: '' });
    });
    HrbStore.dispatch({
        type: "LOAD_TYPE",
        list: global.copyObj(filterArr.type).list,
        currVal: "全部"
    });
    return {
        type: LOAD_REGCODELIST,
        codeList: codeList,
        filters: {
            filtesRight: filterArr,
            filtesLeft: {
                type: global.copyObj(filterArr.type),
                dept: global.copyObj(filterArr.dept)
            }
        },
        filtedList: codeList
    };
};
export const fetchPatInfo = cardNo => {
    fetch(`${global.host}patient/findByCardNo?token=${global.token}&cardNo=${cardNo}&time=${new Date().getTime()}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                HrbStore.dispatch({
                    type: "EDITE_PATINFO",
                    patientInfo: data.data
                });
                reloadPage();
                focusDom('codeNum')
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
export const fetchChargeOptions = () => {
    fetch(`${global.host}outpatient/register/chargeOptions?token=${global.token}&time=${new Date().getTime()}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data)
            if (data.code == 0) {
                for (let item in data.data) {
                    data.data[item].map((one, index) => {
                        one.key =
                            one.typeName ||
                            one.itemName ||
                            one.discountName ||
                            one.payWayName;
                        one.value =
                            one.typeCode ||
                            one.itemCode ||
                            one.discountCode ||
                            one.payWayCode;
                    });
                }
                let chargeType = {
                    key: data.data.chargeTypes[0].key,
                    value: data.data.chargeTypes[0].value
                };
                data.data.chargeTypes.map(item => {
                    if (item.key == '自费') {
                        chargeType.key = item.key;
                        chargeType.value = item.value;
                    }
                })
                HrbStore.dispatch({
                    type: "UPDATE_CHARGE",
                    data: data.data,
                    chargeType: {
                        key: chargeType.key,
                        value: chargeType.value
                    }
                });
                let payWay = {
                    key: data.data.payWays[0].key,
                    value: data.data.payWays[0].value
                }
                data.data.payWays.map(item => {
                    if (item.key == '现金') {
                        payWay.key = item.key;
                        payWay.value = item.value;
                    }
                })
                HrbStore.dispatch({
                    type: "UPDATE_PAYWAY",
                    data: {
                        key: payWay.key,
                        value: payWay.value
                    }
                });
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
export const fetchInvoice = () => {
    // fetch(`${global.host}invoice/invoiceInfo?token=${global.token}`)
    fetch(`${global.host}invoice/info/user?token=${global.token}&time=${new Date().getTime()}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                HrbStore.dispatch({
                    type: "UPDATE_INVOICE",
                    invoice: data.data
                });
                let index = data.data.currentInvoiceNoRange.indexOf('～');
                let invoiceLeft = Number(data.data.currentInvoiceNoRange.substring(index + 1)) - Number(data.data.currentInvoiceNo)
                if (invoiceLeft == 30 || invoiceLeft == 20 || invoiceLeft == 10) {
                    global.message.warning('您的剩余发票号已经不多，请注意领用。')
                }
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error(global.toast.sysErro);
                console.log(data.msg);
            }
        })
        .catch(err => console.log(err));
};
export const updateSelectedCard = (index, cardArr) => {
    cardArr.splice(index, 1);
    let arr = [];
    cardArr.map((item, index) => {
        arr.push(item);
    });
    return {
        type: "UPDATE_CARDLIST",
        data: arr
    };
};

export const addCodeCard = (code, list) => {
    return {
        type: "ADD_CARD",
        data: list.filtedList.filter(item => {
            return item.code === code;
        })
    };
};
export const addFilterItem = (newFilter, regCodeList, isLeft) => {
    //根据传来的过滤参数，结合原本的过滤参数进行过滤
    let list = regCodeList.codeList;
    let theFilters = isLeft ?
        regCodeList.filters.filtesLeft :
        regCodeList.filters.filtesRight;
    let thisFilter = {};
    // console.log(regCodeList);
    for (let item in newFilter) {
        //过滤参数写入过滤器中
        theFilters[item].currVal = newFilter[item];
    }
    for (let item in theFilters) {
        //整合过滤器中的参数
        if (
            theFilters[item].currVal !== "" &&
            theFilters[item].currVal !== "全部"
        )
            thisFilter[item] = theFilters[item].currVal;
    }
    list = filterList(list, thisFilter); //过滤列表
    if (list.length == 1) {
        HrbStore.dispatch({
            type: "UPDATE_CARDLIST",
            data: list
        });
        let filterTemp = Object.assign({}, regCodeList.filters);
        for (let item in filterTemp.filtesRight) {
            filterTemp.filtesRight[item].currVal = list[0][item]
        }
        HrbStore.dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
        focusDom("chargeOptions", "ant-select-selection");
    }
    return {
        type: FILTER_REGCODELIST,
        filters: Object.assign({}, regCodeList.filters),
        filtedList: list
    };
};
export const codeFiter = (code, list) => {
    let listFilted = filterCode(list.codeList, { code: code });
    if (listFilted.length == 1) {
        HrbStore.dispatch({
            type: "UPDATE_CARDLIST",
            data: listFilted
        });
        //  将唯一选定后的卡片筛选值加入右侧form表单中
        let filterTemp = Object.assign({}, list.filters);
        for (let item in filterTemp.filtesRight) {
            filterTemp.filtesRight[item].currVal = listFilted[0][item]
        }
        HrbStore.dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
        // 焦点变更
        focusDom("chargeOptions", "ant-select-selection");
    }
    HrbStore.dispatch({
        type: FILTER_REGCODELIST,
        filtedList: listFilted
    });
};
export const clearFilter = (regCodeList, side) => {
    //清空过滤器过滤参数 ,side决定清空过滤器的位置，left左侧，right右侧，其余清空全部
    let filters;
    if (side == "left") {
        filters = regCodeList.filters.filtesLeft;
        for (let item in filters) {
            filters[item].currVal = "";
        }
    } else if (side == "right") {
        filters = regCodeList.filters.filtesRight;
        for (let item in filters) {
            filters[item].currVal = "";
        }
    } else {
        filters = regCodeList.filters;
        for (let item in filters) {
            for (let item2 in filters[item]) {
                filters[item][item2].currVal = "";
            }
        }
    }
    return {
        type: "CLEAR_FILTER",
        filters: Object.assign({}, regCodeList.filters),
        filtedList: regCodeList.codeList
    };
};

function getFilter(key, list) {
    //遍历获取所有list中含有key的种类
    let filter = [];
    list.map((item, index) => {
        if (filter.indexOf(item[key]) < 0) filter.push(item[key]);
    });
    return arrToObj(filter);
}

function arrToObj(arr) {
    //[1,2] to [{key:1,value:1},{key:2,value:2}]
    let obj = [];
    arr.map((item, index) => {
        obj[index] = {};
        obj[index].key = item;
        obj[index].value = item;
    });
    return obj;
}

function filterList(list, filters) {
    //用filters过滤list,filters{time: '上午'}
    for (let item in filters) {
        list = list.filter(regCode => {
            return regCode[item] == filters[item] || filters[item] == '';
        });
    }
    return list;
}
const filterCode = (list, filters) => {
    //用filters过滤list
    for (let item in filters) {
        list = list.filter(regCode => {
            return regCode[item].indexOf(filters[item]) >= 0;
        });
    }
    return list;
};
const getWeekDay = day => {
    day = new Date(day).getDay();
    let weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDayArr[day];
};
const getNextDate = today => {
    today = new Date(today);
    return today.setDate(today.getDate() + 1);
};
const getDates = () => {
    let day = new Date();
    let dateList = [];
    [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
        dateList[index] = {};
        dateList[index].date = global.dateFormat(day, "MM月DD日");
        dateList[index].weekday = getWeekDay(day);
        dateList[index].day = day;
        day = getNextDate(day);
    });
    return dateList;
};
export const updateRegisList = (listArr, total) => {
    let arr = [];
    listArr.map((item, index) => {
        item.registerTime = item.registerTime.substring(0, item.registerTime.indexOf("."));
        item.visitDate = global.dateFormat(item.visitDate, "YY-MM-DD");
        arr.push(item);
    });
    let arrObj = {
        registerRecords: arr,
        total: total
    };
    return {
        type: "UPDATE_REGLIST",
        data: arrObj
    };
};
export const doAddPatientInfo = data => {
    let ageArr = [];
    if (data.ageYear == "0") data.ageYear == "";
    if (data.ageMonth == "0") data.ageMonth == "";
    if (data.ageDay == "0") data.ageDay == "";
    ageArr.push(data.ageYear || "");
    ageArr.push(data.ageMonth || "");
    ageArr.push(data.ageDay || "");
    for (let i = 0; i < ageArr.length; i++) {
        if (ageArr[i] && ageArr[i] != "") {
            if (i === 0) ageArr[i] = `${ageArr[i]}周岁`;
            if (i === 1) ageArr[i] = `${ageArr[i]}个月`;
            if (i === 2) ageArr[i] = `${ageArr[i]}天`;
        }
    }
    let ageStr = ageArr.join(",").replace(/,/g, '');
    const params = {
        patientName: data.patName,
        age: ageStr,
        sex: data.sex,
        idType: data.idType,
        idNum: data.idNum,
        patientId: data.patientId
    };
    let url = `${global.host}/patient/create?token=${global.token}&time=${new Date().getTime()}`;
    let result = global.post(url, global.objToParams(data));
    let obj = {
        patientId: data.patientId,
        state: "",
        permitId: false
    };
    result
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                global.message.success("保存成功！");
                obj.state = "Success";
                obj.permitId = true;
                HrbStore.dispatch({
                    type: "ADD_REGISTER_PATIENT_INFO",
                    data: obj
                });
                HrbStore.dispatch({ type: "CLEAR_CARDLIST" });
                reloadPage();
                HrbStore.dispatch({ type: 'NO_REGISTED' });
                loadRegInfo(params);
            } else {
                global.message.error("系统异常！");
                obj.state = "Fail";
                obj.permitId = false;
                HrbStore.dispatch({
                    type: "ADD_REGISTER_PATIENT_INFO",
                    data: obj
                });
            }
        })
        .catch(err => console.log(err));
};
//清空建档弹窗上用户的输入
export const doClearValue = flag => {
    return {
        type: "CLEAR_INPUT_VALUE",
        state: true
    };
};
export const focusDom = (supId, subClass) => {
    //获取焦点方法，supId为上级节点id;subClass是需要focus的子节点的class，为空时focus supId节点
    let nodeList;
    let dom = document.getElementById(supId);
    if (subClass) {
        if (!document.getElementsByClassName) {
            nodeList = global.fixGetElementsByClassName(subClass, dom);
        } else {
            nodeList = dom.getElementsByClassName(subClass);
        }
        nodeList[0].focus();
    } else {
        dom.focus();
    }
};
//根据卡号获取病人的基本信息
export const doFetchPatientInfo = cardNo => {
    let url = `${global.host}patient/getBasPatientIds?token=${global.token}&patientId=${cardNo}&time=${new Date().getTime()}`;
    let result = global.get(url);
    result
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                data.data;
                let dataObj = [];
                data.data.map(function(item, index) {
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
                        patientId: item.patientId
                    });
                });
                HrbStore.dispatch({
                    type: "LOAD_IDMGR_INFO",
                    data: dataObj
                });
            } else {
                global.message.error("系统异常");
            }
        })
        .catch(err => console.log(err));
};

export const changeListEditState = (index, dataSource) => {
    Object.keys(dataSource[index]).forEach(item => {
        if (
            dataSource[index][item] &&
            typeof dataSource[index][item].editable !== "undefined"
        ) {
            dataSource[index][item].editable = true;
        }
    });
    return {
        type: "EDIT_TABLE_ITEM",
        data: dataSource
    };
};
export const handleTableItemChange = (key, index, value, dataSource) => {
    dataSource[index][key].value = value;
    return {
        type: "HANDLE_TABLE_ITEM",
        data: dataSource
    };
};
export const editDoneListState = (dataSource, index, type) => {
    Object.keys(dataSource[index]).forEach(item => {
        if (
            dataSource[index][item] &&
            typeof dataSource[index][item].editable !== "undefined"
        ) {
            dataSource[index][item].editable = false;
            dataSource[index][item].status = type;
        }
    });
    Object.keys(dataSource[index]).forEach(function(item) {
        if (
            dataSource[index][item] &&
            typeof dataSource[index][item].editable !== "undefined"
        ) {
            delete dataSource[index][item].status;
        }
    });
    return {
        type: "EDIT_TABLE_ITEM_DONE",
        data: dataSource
    };
};
export const fetchIdMgrOptions = () => {
    let url = `${global.host}patient/getIdTypeOptions?token=${global.token}&time=${new Date().getTime()}`;
    let result = global.get(url);
    result
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                data.data;
                let dataObj = [];
                data.data.length > 0 ?
                    data.data.idTypeOptions.map(function(item, index) {
                        dataObj.push(item);
                    }) : [];
                return {
                    type: "LOAD_IDMGR_OPTIONS",
                    data: dataObj
                }
            } else {
                global.message.error("系统异常");
            }
        })
        .catch(err => console.log(err));
};
export const updateIdMgrList = (param, patientId) => {
    let data = {};
    let arr = [];
    param.map(function(item, index) {
        arr.push(item)
    })
    data = { "basPatientIdList": arr };
    let params = '';
    let obj = "";
    data.basPatientIdList.map((item, i) => {
        params += `&basPatientIdList[${i}].idNum=${item.idNum}&basPatientIdList[${i}].idType=${encodeURIComponent(item.idType)}&basPatientIdList[${i}].patientId=${item.patientId}`
    })
    params = params.substring(params.indexOf("&") + 1);
    let url = `${global.host}patient/insertBasPatientIds?token=${global.token}&time=${new Date().getTime()}&patientId=${patientId}`;
    let result = global.post(url, params);
    result
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                global.message.success("保存成功")
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error("系统异常");
                console.log(data.msg)
            }
        })
        .catch(err => console.log(err));
}