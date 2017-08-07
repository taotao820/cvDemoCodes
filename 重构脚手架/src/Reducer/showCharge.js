import {SHOW_CHARGE, HIDE_CHARGE} from '../Common/js/constants';

var showCover = (state = false, action) => {
    switch (action.type) {
        case SHOW_CHARGE:
            return true;
        case HIDE_CHARGE:
            return false;
        default:
            return state;
    }
};

export default showCover;