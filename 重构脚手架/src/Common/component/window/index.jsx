/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Dialog from "../dialog/index";
import RegisterCharge from "./registerCharge";
class Record extends Component {
    closeDialog() {
        this.props.dispatch({type: "HIDE_CHARGE"});
        this.props.dispatch({type: "HIDE_COVER"});
    }
    render() {
        let {myStates} = this.props;
        let title = (myStates.isRegisted) ? '退费' : '结算';
        return (
            <div className={myStates.showCharge ? style["record"] : ""}>
                <Dialog
                    icon="Settlement"
                    dialogTitle={title}
                    csDialog={this.closeDialog.bind(this)}
                />
                <div className={style["dialog-bd"]}>
                    <RegisterCharge></RegisterCharge>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { myStates } = state;
    return {
        myStates
    };
}
export default connect(mapStateToProps)(Record);
