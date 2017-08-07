import { combineReducers } from "redux";
import dates from "./dateList";
import showEditFile from "./editFileShow";
import regCodeList from "./regCodeList";
import patInfo from "./patientInfo";
import invoice from "./invoice";
import registerList from "./registerList";
import selectedCard from "./selectRegCard";
import user from "./userInfo";
import checkType from "./checkType";
import chargeOptions from "./chargeOptions";
import registerPatientState from "./registerPatientInfo";
import chargeInfo from "./preCharge";
import myStates from "./myStates";
import tempDatas from "./tempData";
import idsInfoList from "./idMgrInfoList";
const chatReducers = combineReducers({
    dates,
    showEditFile,
    regCodeList,
    patInfo,
    invoice,
    registerList,
    selectedCard,
    user,
    checkType,
    chargeOptions,
    registerPatientState,
    chargeInfo,
    myStates,
    tempDatas,
    idsInfoList
});

export default chatReducers;