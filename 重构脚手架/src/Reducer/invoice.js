import {UPDATE_INVOICE} from '../Common/js/constants';

let invoiceInfo = {
    usedInvoiceNum: '',
    canceledInvoiceNum: '',
    currentInvoiceNo: '',
    currentInvoiceNoRange: '',
    takeId: ''
}
const invoice = (state = {}, action) => {
    switch (action.type){
        case UPDATE_INVOICE:
            return Object.assign({}, state, action.invoice);
        default:
            return state;
    }
};
export default invoice;