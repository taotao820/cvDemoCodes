import { SHOW_COVER, HIDE_COVER, SHOW_TOP, HIDE_TOP, SHOW_CHARGE, HIDE_CHARGE, SHOW_EDITFILE, HIDE_EDITEFILE } from '../Common/js/constants';
let myStates = {
    isRegisted: false,
    showMenu: false,
    showChange: false,
    showReturn: false,
    showCover: false,
    showOpeCover: false,
    showTop: false,
    showCharge: false,
    showEditFile: false,
    showPatList: false,
    showPrinterSel: false,
    showChangeInvoice: false
}
var canShow = (state = myStates, action) => {
    switch (action.type) {
        case 'IS_REGISTED':
            return Object.assign({}, state, { isRegisted: true });
        case 'NO_REGISTED':
            return Object.assign({}, state, { isRegisted: false });
        case 'SHOW_CHANGE':
            return Object.assign({}, state, { showChange: !state.showChange });
        case 'SHOW_RETURN':
            return Object.assign({}, state, { showReturn: !state.showReturn });
        case 'SHOW_MENU':
            return Object.assign({}, state, { showMenu: !state.showMenu });
        case 'RELOAD':
            return Object.assign({}, state, {
                isRegisted: true,
                showMenu: false,
                showChange: false,
                showReturn: false,
                showCover: false,
                showCharge: false,
                showOpeCover: false
            });
        case SHOW_COVER:
            return Object.assign({}, state, { showCover: true });
        case HIDE_COVER:
            return Object.assign({}, state, { showCover: false });
        case 'SHOW_OPECOVER':
            return Object.assign({}, state, { showOpeCover: true });
        case 'HIDE_OPECOVER':
            return Object.assign({}, state, { showOpeCover: false });
        case 'SHOW_PATLIST':
            return Object.assign({}, state, { showPatList: true });
        case 'HIDE_PATLIST':
            return Object.assign({}, state, { showPatList: false });
        case SHOW_TOP:
            return Object.assign({}, state, { showTop: true });
        case HIDE_TOP:
            return Object.assign({}, state, { showTop: false });
        case SHOW_CHARGE:
            return Object.assign({}, state, { showCharge: true });
        case HIDE_CHARGE:
            return Object.assign({}, state, { showCharge: false });
        case SHOW_EDITFILE:
            return Object.assign({}, state, { showEditFile: true });
        case HIDE_EDITEFILE:
            return Object.assign({}, state, { showEditFile: false });
        case 'SHOW_PRINTER':
            return Object.assign({}, state, { showPrinterSel: true });
        case 'HIDE_PRINTER':
            return Object.assign({}, state, { showPrinterSel: false });
        case 'SHOW_CHANGEINVOICE':
            return Object.assign({}, state, { showChangeInvoice: true });
        case 'HIDE_CHANGEINVOICE':
            return Object.assign({}, state, { showChangeInvoice: false });
        default:
            return state;
    }
};

export default canShow;