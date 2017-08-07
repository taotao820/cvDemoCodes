import {
    LOAD_IDMGR_INFO,
    LOAD_IDMGR_OPTIONS,
    EDIT_TABLE_ITEM,
    HANDLE_TABLE_ITEM,
    EDIT_TABLE_ITEM_DONE,
    UPDATE_IDMGR_INFO,
    STORE_OLD_DATA,
    ADD_IDS_FAILURE,
    OPTION_DEFAULT_VALUE,
    OPTION_SELECT_VALUE
} from "../Common/js/constants";
var idsListObj = {
    idsList: [],
    options: [],
    oldData: {},
    show: false
};

const idsInfoList = (state = idsListObj, action) => {
    switch (action.type) {
        case LOAD_IDMGR_INFO:
            idsList = action.type;
            return Object.assign({}, state, { idsList: action.data });
        case LOAD_IDMGR_OPTIONS:
            return Object.assign({}, state, { options: action.data });
        case UPDATE_IDMGR_INFO:
            return Object.assign({}, state, { idsList: action.data });
        case STORE_OLD_DATA:
            return Object.assign({}, state, { oldData: action.data });
        case ADD_IDS_FAILURE:
            return action.data;
        case OPTION_DEFAULT_VALUE:
            return Object.assign({}, state, { show: true });
        case OPTION_SELECT_VALUE:
            return Object.assign({}, state, { show: false });
            // case HANDLE_TABLE_ITEM:
            //     list.idsList = action.data;
            //     return list.idsList;
            // case EDIT_TABLE_ITEM_DONE:
            //     list.idsList = action.data;
            //     return list.idsList;
        default:
            return state;
    }
};
export default idsInfoList;