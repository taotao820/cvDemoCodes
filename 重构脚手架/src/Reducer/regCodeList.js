import {
  LOAD_REGCODELIST,
  FILTER_REGCODELIST,
  SET_FILTER,
  CLEAR_FILTER
} from "../Common/js/constants";

var regCodeList = {
    codeList: [
    ],
    filters: {
        filtesLeft: {
            type: {
                type: "type",
                list: [],
                currVal: ""
            },
            dept: {
                type: "dept",
                list: [],
                currVal: ""
            }
        },
        filtesRight: {
            time: {
                type: "time",
                list: [],
                currVal: ""
            },
            dept: {
                type: "dept",
                list: [],
                currVal: ""
            },
            type: {
                type: "type",
                list: [],
                currVal: ""
            },
            docName: {
                type: "docName",
                list: [],
                currVal: ""
            }
        }
    },
    filtedList: [
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "司徒正美",
        //     code: 101,
        //     type: "专家",
        //     time: "上午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "司徒正美",
        //     code: 102,
        //     type: "普通",
        //     time: "下午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "沙瑞金",
        //     code: 103,
        //     type: "专家",
        //     time: "上午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "侯亮平",
        //     code: 104,
        //     type: "专家",
        //     time: "下午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "张三",
        //     code: 105,
        //     type: "专家",
        //     time: "上午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "李四",
        //     code: 106,
        //     type: "普通",
        //     time: "上午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "王五",
        //     code: 107,
        //     type: "专家",
        //     time: "上午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "王明",
        //     code: 108,
        //     type: "专家",
        //     time: "下午",
        //     date: ""
        // },
        // {
        //     dept: "妇产科",
        //     number: 23,
        //     docName: "王明",
        //     code: 109,
        //     type: "专家",
        //     time: "下午",
        //     date: ""
        // },
        // {
        //     dept: "内科",
        //     number: 23,
        //     docName: "浏阳河",
        //     code: 110,
        //     type: "专家",
        //     time: "下午",
        //     date: ""
        // },
        // {
        //     dept: "内科",
        //     number: 23,
        //     docName: "浏阳河",
        //     code: 110,
        //     type: "普通",
        //     time: "上午",
        //     date: ""
        // }
    ]
};
const regCodes = (state = regCodeList, action) => {
    switch (action.type) {
        case LOAD_REGCODELIST:
            return Object.assign({}, state, {
                codeList: action.codeList,
                filtedList: action.codeList,
                filters: action.filters
            });
        case FILTER_REGCODELIST:
            return Object.assign({}, state, {
                filtedList: action.filtedList,
                filter: action.filter
            });
        case CLEAR_FILTER:
            return Object.assign({}, state, {
                filtedList: action.filtedList,
                filter: action.filter
            });
        case SET_FILTER:
            return Object.assign({}, state, { filters: action.filters });
        default:
            return state;
    }
};
export default regCodes;
