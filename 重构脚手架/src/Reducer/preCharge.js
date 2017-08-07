import {EDITE_CHARGE} from '../Common/js/constants';

var preCharge = {
    charge: '',
    cost: '',
    discount: '',
    cashIn: '',
    change: ''
}
const chargeInfo = (state = preCharge, action) => {
    switch (action.type){
        case EDITE_CHARGE:
            return Object.assign({}, state, action.charge);
        default:
            return state;
    }
};
export default chargeInfo;