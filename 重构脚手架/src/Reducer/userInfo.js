import {EDIT_USER} from '../Common/js/constants';
let userInfo={
	id: '',
	name: '王二',
	jobNo: '',
	hosnum: '汤陵社区卫生服务中心',
	nodecode: '',
	insName: '',
	deptCode: '',
	deptname: '收费部'
}
let user = (state = {}, action) => {
    switch (action.type) {
        case EDIT_USER:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export default user;