import HrbStore from "../../Reducer/hrbStore";

export const fetchMenu = (param) => {
    let token = window.sessionStorage.getItem('token');
    return fetch(`${global.host}patient/searchPatientInfoList?token=${token}&${param}&time=${new Date().getTime()}`)
}