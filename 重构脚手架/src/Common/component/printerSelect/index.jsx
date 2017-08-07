/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Dialog from "../dialog/index";
import SelectItem from "../selectItem";
import Btn from "../button";
import {fetchMenu} from '../../../Action/register/patListWin';
import {getPrinterList, doPrintAction} from '../../../Action/print/printActions';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                    key: "就诊过",
                    value: "1"
                }
            ],
            searchRange: { key: "", value: "" }
        };
    }

    componentWillMount() {
        this.setState({options: getPrinterList()})
    }
    closeDialog() {
        this.props.dispatch({ type: "HIDE_COVER" });
        this.props.dispatch({ type: "HIDE_PRINTER" });
    }
    cbSelect(val, type) {
        let objSelected = this.state.options.filter(item => item.value == val);
        // console.log(objSelected)
        this.setState({ searchRange: objSelected[0] });
    }
    printInv(){
        window.localStorage.setItem('printerName', this.state.searchRange.value);
        global.printerName = window.localStorage.getItem('printerName');
        doPrintAction(this.props.tempDatas.invoiceId,3);
        this.props.dispatch({ type: "HIDE_COVER" });
        this.props.dispatch({ type: "HIDE_PRINTER" });
    }
    render() {
        let { myStates } = this.props;
        let title = "打印机选择";
        let searchRange = {
            title: "打印机选择",
            isClick: false,
            options: this.state.options,
            value: this.state.searchRange.value,
            filterType: "dept",
            size: 'large',
            type: "select"
        }
        return (
            <div className={style["record"]}>
                <Dialog
                    icon="Settlement"
                    dialogTitle={title}
                    csDialog={this.closeDialog.bind(this)}
                />
                <div className={style["dialog-bd"]}>
                    <div className={style["top"]}>
                        <SelectItem info={searchRange} cb={this.cbSelect.bind(this)}/>
                        <div className={style["div"]}>
                            <Btn
                                title="打印"
                                src="icon_putonfile.png"
                                cbBtn={this.printInv.bind(this)}
                            />
                            <Btn
                                title="取消"
                                src="icon_putonfile.png"
                                cbBtn={this.closeDialog.bind(this)}
                            />
                            <div className={style["clear"]} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let { myStates, tempDatas } = state;
    return {
        myStates, tempDatas
    };
}
export default connect(mapStateToProps)(Record);
