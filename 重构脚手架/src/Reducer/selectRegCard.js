import {UPDATE_CARDLIST, ADD_CARD, CLEAR_CARDLIST} from '../Common/js/constants';

var selectedCard = [
    {
        dept: '妇产科',
        number: 23,
        docName: '司徒正美',
        code: 101,
        type: '专家',
        time: '上午',
        date: ''
    }]
const selectedCards = (state = [], action) => {
    switch (action.type)
    {
        case ADD_CARD:
            return [].concat(action.data);
        case UPDATE_CARDLIST:
            return action.data;
        case CLEAR_CARDLIST:
            return [];
        case 'ADD_CARD_multi':
            return ((state.filter(item => item.code === action.data[0].code)).length > 0) ? state : action.data.concat(state);
        default:
            return state;
    }
};
export default selectedCards;