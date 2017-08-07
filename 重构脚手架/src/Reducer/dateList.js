import {CHECK_DATE, LOAD_DATE} from '../Common/js/constants';

let dates = {
    dateList:[
    ],
    checked: 0,
    checkedDate: ''
}
const dateList = (state = dates, action) => {
    switch (action.type){
        case LOAD_DATE:
            return Object.assign({}, state, {checked: 0, dateList: action.dateList, checkedDate: action.checkedDate});
        case CHECK_DATE:
            return Object.assign({}, state, {checked: action.checked, checkedDate: action.checkedDate});
        default:
            return state;
    }
};
export default dateList;