import {UPDATE_CHARGE, UPDATE_ADD_CHARGE, UPDATE_DISCOUNT, UPDATE_CHARGE_TYPE} from '../Common/js/constants';

let chargeInfo = {
    additionalChargeItems: [{key:'a', value:'a'}],
    chargeTypes: [],
    discountTypes: [],
    additionalCharge: {key:'', value:''},
    discount: {key:'', value:''},
    chargeType: {key:'', value:''},
    payWay: {key:'', value:''}
}
const chargeOptions = (state = chargeInfo, action) => {
    switch (action.type){
        case UPDATE_CHARGE:
            return Object.assign({}, state, {
                additionalChargeItems: [].concat(action.data.additionalChargeItems),
                chargeTypes: [].concat(action.data.chargeTypes),
                discountTypes: [].concat(action.data.discountTypes),
                payWays: [].concat(action.data.payWays),
                chargeType: action.chargeType
            });
        case UPDATE_ADD_CHARGE:
            return Object.assign({}, state, {
                additionalCharge: action.data
            });
        case UPDATE_DISCOUNT:
            return Object.assign({}, state, {
                discount: action.data
            });
        case UPDATE_CHARGE_TYPE:
            return Object.assign({}, state, {
                chargeType: action.data
            });
        case 'UPDATE_PAYWAY':
            return Object.assign({}, state, {
                payWay: action.data
            });
        default:
            return state;
    }
};
export default chargeOptions;