import {
    ADD_REGISTER_PATIENT_INFO,
    CLEAR_FORM_INPUT_SUCCESS,
    CLEAR_FORM_INPUT_FAIL,
    CLOSE_REGITER_DIALOG,
    READ_CARD_PATIENT,
    SHOW_FORM_VALUES
} from "../Common/js/constants";
let obj = {
    patientId: "",
    state: "",
    permitId: false,
    values: {}
};
const registerPatientState = (state = obj, action) => {
    switch (action.type) {
        case ADD_REGISTER_PATIENT_INFO:
            obj = action.data;
            return Object.assign({}, state, action.data);
        case CLEAR_FORM_INPUT_SUCCESS:
            return {
                patientId: obj.patientId,
                state: "",
                permitId: true
            };
        case CLEAR_FORM_INPUT_FAIL:
            return {
                patientId: obj.patientId,
                state: "",
                permitId: false
            };
        case CLOSE_REGITER_DIALOG:
            return {
                patientId: "",
                state: "",
                permitId: ""
            };
        case READ_CARD_PATIENT:
            return {
                patientId: action.data,
                state: "",
                permitId: true
            }
        case SHOW_FORM_VALUES:
            return {
                values: action.data,
                permitId: true,
                patientId: action.data.patientId
            }
        default:
            return state || "";
    }
};
export default registerPatientState;