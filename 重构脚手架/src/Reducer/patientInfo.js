import { EDITE_PATINFO } from "../Common/js/constants";

var patientInfo = {
    patientName: "王晓易",
    age: "21",
    sex: "男",
    idType: "身份证",
    idNum: "110111199008169999",
    patientId: "22222222222"
};
const patInfo = (state = {}, action) => {
    switch (action.type) {
        case EDITE_PATINFO:
            return Object.assign({}, state, action.patientInfo);
        case "CLEAR_PATINFO":
            return {};
        default:
            return state;
    }
};
export default patInfo;
