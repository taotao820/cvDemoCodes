/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';

class InputItem extends Component {
    keyPress(e){
        if(e.keyCode == 9 && this.props.info.title == '号别')return;
        if(this.props.cb)
        this.props.cb(e.target.value, this.props.info.title);
    }
    valChange(e){
        if(this.props.cbChange)
        this.props.cbChange(e.target.value, this.props.info.title);
    }
    render() {
        let {info, code} = this.props;
        let cln = {};
        switch (info.size){
            case 'small':
                cln.wrap = style['inputItem'];
                cln.span = style['span'];
                cln.input = style['input'];
                break;
            case 'big':
                cln.wrap = style['inputItem']+' '+style['wrapBig'];
                cln.span = style['span']+' '+style['spanBig'];
                cln.input = style['input']+' '+style['inputBig'];
                break;
            case 'large':
                cln.wrap = style['inputItem']+' '+style['wrapLar'];
                cln.span = style['span']+' '+style['spanLar'];
                cln.input = style['input']+' '+style['inputLar'];
                break;
            default:
                cln.wrap = style['inputItem']+' '+style['wrapNor'];
                cln.span = style['span']+' '+style['spanNor'];
                cln.input = style['input']+' '+style['inputNor'];
                break;
        }
        return (
            <div className={cln.wrap} style={info.wrapStyle}>
            	<span className={cln.span} style={info.titleStyle}>{info.title}:</span>
                <input id={info.id} defaultValue={info.defaultVal} className={cln.input} type="text" style={info.inputStyle} disabled={info.canEdit} value={info.value} onChange={this.valChange.bind(this)} onKeyUp={this.keyPress.bind(this)}/>
                <div className={style['clear']}></div>
            </div>
        );
    }
}

export default InputItem;
