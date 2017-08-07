/**
 * Created by xuhuitao on 2017/05/15.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Table from "antd/lib/table";
import style1 from "antd/lib/table/style/css";
import style2 from "../../../Common/css/static/table";
import {loadRegInfo, reloadPage} from "../../../Action/register/registerActions";
class PatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.dataSource != nextProps.dataSource) {
            this.setState({ dataSource: nextProps.dataSource });
        }
    }
    onRowClick(record, index) {
        const params = {
            patientName: record.patientName,
            age: record.age,
            sex: record.sex,
            idType: record.idType,
            idNum: record.idNum,
            patientId: record.patientId
        };
        loadRegInfo(params);
        this.props.dispatch({type: "HIDE_COVER"});
        this.props.dispatch({type: "HIDE_PATLIST"});
        this.props.dispatch({type: 'CLEAR_CARDLIST'});
        this.props.dispatch({type: "NO_REGISTED"});
        reloadPage()
    }
    render() {
        return (
            <div className={style["list"]} id="registerList">
                <Table
                    columns={this.props.column}
                    dataSource={this.state.dataSource}
                    bordered
                    pagination={false}
                    scroll={{ x: 650, y: false }}
                    size="small"
                    onRowClick={this.onRowClick.bind(this)}
                />
            </div>
        );
    }
}
export default connect()(PatList);
