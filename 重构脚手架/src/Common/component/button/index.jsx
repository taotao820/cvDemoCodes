/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';

class Btn extends Component {
    render() {
        let {title, titleStyle, wrapStyle, src, cbBtn, forbid, id} = this.props;
        let cln = style['btn'] +' '+ (forbid ? '': style['bgColor'])
        return (
            <button className={cln} style={wrapStyle} id={id} onClick={forbid? '':cbBtn}>
            	<img  src={require('../../img/'+ src)}></img>
                <span className={style['span']} style={titleStyle}>{title}</span>
            </button>
        );
    }
}

export default Btn;
