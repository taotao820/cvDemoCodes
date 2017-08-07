/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import TopTime from './topTime';
import Content from './content';
import FormOpe from './formOpe';
import SlideDiv from './slideDiv';
import ChangeNum from './atom/changeNum';
import ChangeInvoice from './atom/changeInvoice'
import RecordDialog from "../dialog/record/index";
import PatListWin from "../../Common/component/patListWin";
// import ChargeDialog from "./atom/charge";
import ChargeDialog from "../../Common/component/window";

class Register extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'SHOW_TOP'
        })
    }
    render() {
        let {myStates} = this.props;
        return (
            <div className={style['register']}>
                <div id='register-left' className={style['register-left']}>
                    <div className={style['register-left-top']}>
                        <TopTime/>
                    </div>
                    <div className={style['register-left-content']}>
                        <Content/>
                    </div>
                    <div id='slide'>
                        <SlideDiv/>
                    </div>
                </div>
                <div id='register-right' className={style['register-right']}>
                    <FormOpe/>
                </div>
                {
                    () =>{
                        if(myStates.showEditFile){
                            return <RecordDialog/>
                        }
                    }()
                }
                {
                    () =>{
                        if(myStates.showCharge){
                            return <ChargeDialog/>
                        }
                    }()
                }
                {
                    () =>{
                        if(myStates.showPatList){
                            return <PatListWin/>
                        }
                    }()
                }
                {
                    () =>{
                        if(myStates.showChange){
                            return  <ChangeNum></ChangeNum>
                        }
                    }()
                }
                {
                    () =>{
                        if(myStates.showChangeInvoice){
                            return <ChangeInvoice/>
                        }
                    }()
                }
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
export default connect(mapStateToProps)(Register);
