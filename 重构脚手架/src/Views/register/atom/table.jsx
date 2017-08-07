/**
 * Created by xuhuitao on 2017/05/15.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Table from "antd/lib/table";
import style2 from "antd/lib/table/style/css";
import Select from "antd/lib/select";
import style3 from "antd/lib/select/style/css";
import Input from "antd/lib/input";
import style4 from "antd/lib/input/style/css";
import Pagination from "antd/lib/pagination";
import style5 from "antd/lib/pagination/style/css";
import style6 from "../../../Common/css/static/table";
import PageTool from "../../../Common/component/pageTool/pagetool";
import {
    updateRegisList,
    loadRegInfo
} from "../../../Action/register/registerActions";
class RegisterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContents: "",
            showTotalBar: false,
            selectFlag: false,
            loading: false,
            pageInfo: {
                pageSize: 10,
                pageIndex: 1,
                total: 7
            }
        };
    }
    componentWillMount() {
        this.doFetchList();
    }
    getData() {
        let paramObj = {
            isMine: this.state.selectFlag,
            patientKeyWord: this.state.searchContents,
            pageSize: this.state.pageInfo.pageSize,
            curPage: this.state.pageInfo.pageIndex
        };
        return paramObj;
    }
    doFetchList(btnSearch) {
        if(btnSearch) this.state.pageInfo.pageIndex=1; this.setState({pageInfo:this.state.pageInfo});
        let token = window.sessionStorage.getItem("token");
        let url = `${global.host}outpatient/register/records?token=${token}&time=${new Date().getTime()}`;
        let param = this.getData();
        let result = global.post(url, global.objToParams(param));
        result
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.code == 0) {
                    data.data.registerRecords.map(item=>{
                        item.doctorName = (item.doctorName)?item.doctorName:(item.regTypeName == '急诊')?'急诊':'门诊';
                    })
                    this.props.dispatch(
                        updateRegisList(
                            data.data["registerRecords"],
                            data.data["total"]
                        )
                    );
                    this.state.pageInfo.total = data.data["total"];
                    data.data["total"] === 0
                        ? (this.state.showTotalBar = false)
                        : (this.state.showTotalBar = true);
                    this.setState({
                        pageInfo: this.state.pageInfo,
                        showTotalBar: this.state.showTotalBar
                    });
                    //global.fixGetElementsByClassName('ant-pagination-options-quick-jumper','')[0].childNodes[1].value=this.state.pageInfo.pageIndex;
                } else {
                    global.message.error("系统异常");
                }
            })
            .catch(err => console.log(err));
    }
    onHandleInputChange(e) {
        this.setState({ searchContents: e.target.value });
    }
    onHandlePageChange(pageNumber) {
        this.state.pageInfo.pageIndex = pageNumber;
        this.setState({
            pageInfo: this.state.pageInfo
        });
        this.doFetchList();
    }
    handleSelectChange(key) {
        let flag;
        key === "mine" ? (flag = true) : (flag = false);
        this.state.selectFlag = flag;
        this.setState({
            selectFlag: this.state.selectFlag
        });
        this.doFetchList();
    }
    doSearch(event) {
        if (event.key == "Enter") {
            this.state.searchContents = event.target.value;
            this.setState({ searchContents: this.state.searchContents });
            this.doFetchList("btnSearch");
        }
    }
    rowClick(record, index) {
        loadRegInfo(record);
        this.props.closeContainer();
    }
    onPageTo(page){
        this.state.pageInfo.pageIndex = page;
        this.setState({
            pageInfo: this.state.pageInfo
        });
        this.doFetchList();
    }
    render() {
        let { registerList } = this.props;
        return (
            <div className={style["register-list"]}>
                <div className={style["list-navi"] + " " + style["clear"]}>
                    <div className={style["left"]}>
                        <Select
                            defaultValue="全院挂号"
                            style={{ width: 130 }}
                            onChange={this.handleSelectChange.bind(this)}
                        >
                            <Option value="mine">我的挂号</Option>
                            <Option value="all">全院挂号</Option>
                        </Select>
                    </div>
                    <div className={style["right"]}>
                        <img
                            className={style["search-icon"]}
                            src={require("../../../Common/img/icon_search2.png")}
                            onClick={this.doFetchList.bind(this,"btnSearch")}
                        />
                        <Input
                            className={style["search-input"]}
                            placeholder="请输入患者信息"
                            value={this.state.searchContents}
                            onChange={this.onHandleInputChange.bind(this)}
                            onKeyPress={this.doSearch.bind(this)}
                            ref="searchContentsInput"
                        />
                    </div>
                </div>
                <div className={style["list"]} id="registerList">
                    <Table
                        columns={registerList.columnsList}
                        dataSource={registerList.registerRecords}
                        bordered
                        pagination={false}
                        scroll={{ x: 500, y: false }}
                        size="small"
                        onRowClick={this.rowClick.bind(this)}
                    />
                </div>
                {/*this.state.showTotalBar
                    ? <div className={style["pagination"]} id="registerPage">
                          <Pagination
                              defaultCurrent={1} 
                              total={this.state.pageInfo.total}
                              pageSize={this.state.pageInfo.pageSize}
                              current={this.state.pageInfo.pageIndex}
                              onChange={this.onHandlePageChange.bind(this)}
                              showTotal={total => "共" + total + "条 "}
                          />
                          
                      </div>
                    : null*/}
                {this.state.showTotalBar
                    ? <div className={style["pagination"]} id="registerPage"> <PageTool option={this.state.pageInfo} onPageTo={this.onPageTo.bind(this)}/></div>
                    : null}

            </div>
        );
    }
}
function mapStateToProps(state) {
    let { registerList } = state;
    return {
        registerList
    };
}
export default connect(mapStateToProps)(RegisterList);
