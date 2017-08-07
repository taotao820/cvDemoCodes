// import {SHOW_EDITFILE, HIDE_EDITEFILE} from '../Common/js/constants';
let tempDatas={
	isRegisted: 'false'
}
var temp = (state = tempDatas, action) => {
    switch (action.type) {
        case 'EDITE_TEMPDATA':
            return Object.assign({}, state, action.data);
        case 'CLEAR_TEMPDATA':
            return {};
        default:
            return state;
    }
};

export default temp;