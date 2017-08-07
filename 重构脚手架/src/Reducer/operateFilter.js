import {CHECK_DATE} from '../Common/js/constants';

var dates = {
    dateList:[
        {
            date: '5月1日',
            weekday:'周一'
        }, {
            date: '5月2日',
            weekday:'周二'
        }, {
            date: '5月3日',
            weekday:'周三'
        }, {
            date: '5月4日',
            weekday:'周四'
        }, {
            date: '5月5日',
            weekday:'周五'
        }, {
            date: '5月6日',
            weekday:'周六'
        }, {
            date: '5月7日',
            weekday:'周日'
        }
    ],
    checked: 0
}
const dateList = (state = dates, action) => {
    switch (action.type)
     {
        case CHECK_DATE:
            state.checked = action.checked;
            return state;
        default:
            return state;
    }
};
export default dateList;