import HrbStore from "../../Reducer/hrbStore";
import { doPrintAction } from "../print/printActions";
import { fetchCardList,reloadPage } from "./registerActions";

export const registe = (patInfo, options, card, chargeInfo) => {
    let params = registerParam(patInfo, options, card);
    return fetch(`${global.host}outpatient/register/create?token=${global.token}${params}&time=${new Date().getTime()}`).then(res => {
            return res.json();
        }).then(data => {
            if (data.code == 0) {
                document.getElementById('codeNum').value = '';
                pay(chargeInfo, options, patInfo, data.data.payDetailIds, '收费', data.data.registerId)
            } else if (data.code == 1) {
                global.message.error('挂号失败,' + data.msg);
            } else {
                global.message.error('系统异常');
                console.log(data.msg)
            }
        })
        .catch(err => {
            console.log(err);
        });
};
export const registerParam = (patInfo, options, card) => {
    let params = "";
    card.map((item, i) => {
        params += `&schId=${item.id}&day=${global.dateFormat(Number(item.scheduleDate), "YY-MM-DD")}&scheduleId=${item.code}&patientId=${patInfo.patientId}&chgTypeCode=${options.chargeType.value}&additionalItemsCodeStr=${options.additionalCharge.value}`;
    });
    return params;
};
export const payParam = (chargeInfo, options, patInfo, payDetailIds, regId) => {
    let ids = '';
    payDetailIds.map((item, i) => {
        ids += `&payDetailIds[${i}]=${item}`
    });
    let payParams = Object.assign({}, chargeInfo, {
        payTypeCode: options.payWay.value,
        payTypeName: options.payWay.key,
        chargeTypeCode: options.chargeType.value,
        chargeTypeName: options.chargeType.key,
        patientId: patInfo.patientId,
        visitId: regId
    });
    return `token=${global.token}&${global.queryString.stringify(payParams)}${ids}`;
};
export const pay = (chargeInfo, options, patInfo, payDetailIds, type, regId) => {
    let params = payParam(chargeInfo, options, patInfo, payDetailIds, regId);
    fetch(`${global.host}pay/self?${params}&time=${new Date().getTime()}`).then(res => {
        return res.json();
    }).then(data => {
        if (data.code == 0) {
            // if(type == '收费'){
            //     global.message.success("挂号收费成功");
            // }else{
            //     global.message.success("退费成功");
            // }
            HrbStore.dispatch({
                type: 'EDITE_CHARGE',
                charge: { change: 0 }
            });
            HrbStore.dispatch({type: "CLEAR_PATINFO"});
            HrbStore.dispatch({type: "CLEAR_CARDLIST"});
            if (type == '收费') {
                HrbStore.dispatch({ type: "EDITE_TEMPDATA", data: { invoiceId: data.data.invoiceId } });
                getPrint(data.data.invoiceId);
            }
            reloadPage();
        } else if (data.code == 1) {
            global.message.error("收费失败," + data.msg);
            if (type == '收费') {
                returnNum(regId, '收费失败退号');
            }
        } else {
            global.message.error("系统异常");
            console.log(data.msg);
            if (type == '收费') {
                returnNum(regId, '收费失败退号');
            }
        }
    }).catch(err => {
        console.log(err);
    });
};
function getPrint(invoiceId) {
    var printerName = window.localStorage.getItem('printerName');
    if (global.myLodop) {
        if (printerName && global.myLodop.SET_PRINTER_INDEX(printerName)) {
            HrbStore.dispatch({ type: "HIDE_CHARGE" });
            HrbStore.dispatch({ type: "HIDE_COVER" });
            doPrintAction(invoiceId, 3)
        } else {
            window.localStorage.removeItem('printerName')
            HrbStore.dispatch({ type: "SHOW_COVER" });
            HrbStore.dispatch({ type: "HIDE_CHARGE" });
            HrbStore.dispatch({ type: "SHOW_PRINTER" });
        }
    } else {
        HrbStore.dispatch({ type: "HIDE_CHARGE" });
        HrbStore.dispatch({ type: "HIDE_COVER" });
        global.message.warning('无法打印发票，请安装打印驱动')
    }
    // window.localStorage.removeItem('printerName')
    // HrbStore.dispatch({ type: "SHOW_COVER" });
    // HrbStore.dispatch({ type: "HIDE_CHARGE" });
    // HrbStore.dispatch({ type: "SHOW_PRINTER" });
}
export const returnNum = (regId, type, chargeInfo, options, patInfo) => {
    fetch(`${global.host}outpatient/register/return?token=${global.token}&oldRegisterId=${regId}&time=${new Date().getTime()}`).then(res => {
        return res.json();
    }).then(data => {
        if (data.code == 0) {
            if (type == '退号') {
                global.message.success("退号成功");
                pay(chargeInfo, options, patInfo, data.data, '退费', regId);
            }
            HrbStore.dispatch({ type: "RELOAD" });
            HrbStore.dispatch({ type: "NO_REGISTED" });
            HrbStore.dispatch({ type: "CLEAR_PATINFO" });
            HrbStore.dispatch({ type: "CLEAR_CARDLIST" });
            // reloadPage();
        } else if (data.code == 1) {
            global.message.error(data.msg);
        } else {
            global.message.error("系统异常");
            console.log(data.msg);
        }
    });
};
export const changeNum = (regId, card, patInfo, chargeOptions) => {
    let params = changeParams(regId, card, patInfo, chargeOptions);
    fetch(`${global.host}outpatient/register/change?token=${global.token}&${params}&time=${new Date().getTime()}`).then(res => {
            return res.json();
        })
        .then(data => {
            if (data.code == 0) {
                global.message.success("换号成功");
                HrbStore.dispatch({ type: "RELOAD" });
                HrbStore.dispatch({ type: "NO_REGISTED" });
                HrbStore.dispatch({ type: "CLEAR_PATINFO" });
                HrbStore.dispatch({ type: "CLEAR_CARDLIST" });
                reloadPage();
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else {
                global.message.error("系统异常");
                console.log(data.msg);
            }
        });
};
export const changeParams = (regId, card, patInfo, chargeOptions) => {
    let params = `oldRegisterId=${regId}`;
    card.map((item, i) => {
        params += `&schId=${item.id}&day=${global.dateFormat(Number(item.scheduleDate), "YY-MM-DD")}&scheduleId=${item.code}&patientId=${patInfo.patientId}&chgTypeCode=${chargeOptions.chargeType.value}`;
    });
    return params;
};
export const getCharge = (options, card, type, regId) => {
    let params = chargeParam(options, card);
    let url = type == "regFee" ? `${global.host}outpatient/register/getRegFee?token=${global.token}${params}&time=${new Date().getTime()}` : `${global.host}outpatient/register/getRefundRegFee?token=${global.token}&oldRegisterId=${regId}&time=${new Date().getTime()}`;
    fetch(url).then(res => {
        return res.json();
    }).then(data => {
        if (data.code == 0) {
            HrbStore.dispatch({
                type: "EDITE_CHARGE",
                charge: {
                    charge: data.data.charge,
                    discount: data.data.discount,
                    cost: data.data.cost,
                    cashIn: data.data.cost,
                    change: (Number(data.data.cost)-data.data.cost)
                }
            });
        } else if (data.code == 1) {
            global.message.error(data.msg);
        } else {
            global.message.error("系统异常");
            console.log(data.msg);
        }
    }).catch(err => {
        console.log(err);
    });
};
export const chargeParam = (options, card) => {
    let params = "";
    card.map((item, i) => {
        params += `&schId=${item.id}&day=${global.dateFormat(Number(item.scheduleDate), "YY-MM-DD")}&scheduleId=${item.code}&chgTypeCode=${options.chargeType.value}&additionalItemsCodeStr=${options.additionalCharge.value}&discountType=${options.discount.value}`;
    });
    return params;
};