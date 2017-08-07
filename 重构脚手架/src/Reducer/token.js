import {SHOW_TOP, HIDE_TOP} from '../Common/js/constants';

var token = (state = '', action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token;
        default:
            return state;
    }
};

export default token;