import { UPDATE_REGLIST } from "../Common/js/constants";
let registerList = {
    registerRecords: [
        
    ],
    total: 300,
    columnsList: [
        {
            title: "预约时间",
            dataIndex: "visitDate",
            key: "visitDate",
        },
        {
            title: "姓名",
            dataIndex: "patientName",
            key: "patientName"
        },
        { title: "时段", dataIndex: "duration", key: "duration" },
        {
            title: "号类",
            dataIndex: "regTypeName",
            key: "regTypeName"
        },
        { title: "科室", dataIndex: "deptName", key: "deptName" },
        { title: "医生", dataIndex: "doctorName", key: "doctorName" },
        {
            title: "挂号人",
            dataIndex: "operatorName",
            key: "operatorName"
        },
        {
            title: "挂号时间",
            dataIndex: "registerTime",
            key: "registerTime",
            width: 135,
            
        }
    ]
};
const listCodes = (state = registerList, action) => {
    switch (action.type) {
        case UPDATE_REGLIST:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
export default listCodes;
