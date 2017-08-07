import {SHOW_EDITFILE, HIDE_EDITEFILE} from '../Common/js/constants';

var showEditFile = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_EDITFILE':
            return true;
        case 'HIDE_EDITEFILE':
            return false;
        default:
            return state;
    }
};

export default showEditFile;