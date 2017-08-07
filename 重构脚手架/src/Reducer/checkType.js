import {
    LOAD_TYPE,
    SET_TYPE
} from "../Common/js/constants";

var type = {
    type: "type",
    list: [],
    currVal: "全部"
}
const types = (state = type, action) => {
    switch (action.type) {
        case LOAD_TYPE:
            return Object.assign({}, state, {
                list: action.list,
                currVal: action.currVal
            });
        case SET_TYPE:
            return Object.assign({}, state, { currVal: action.currVal });
        default:
            return state;
    }
};
export default types;
