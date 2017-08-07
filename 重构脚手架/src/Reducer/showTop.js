import {SHOW_TOP, HIDE_TOP} from '../Common/js/constants';

var showTOP = (state = true, action) => {
    switch (action.type) {
        case SHOW_TOP:
            return true;
        case HIDE_TOP:
            return false;
        default:
            return state;
    }
};

export default showTOP;