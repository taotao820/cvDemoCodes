import {SHOW_COVER, HIDE_COVER} from '../Common/js/constants';

var showCover = (state = false, action) => {
    switch (action.type) {
        case SHOW_COVER:
            return true;
        case HIDE_COVER:
            return false;
        default:
            return state;
    }
};

export default showCover;