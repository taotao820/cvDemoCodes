/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';

class DataCard extends Component {
    constructor(props) {
        super(props);
    }
    checkData(e){
        this.props.parentCheck(this.index);
    }
    render() {
        let {date, weekday, checked, index} = this.props;
        this.index = index;
        var cln = checked ? classNames({ [style['dataCard']]: true, [style['checked']]: true }) : classNames({ [style['dataCard']]: true, [style['unChecked']]: true })
        return (
            <div className={style['wrapDate']}>
                <div className={cln} onClick={this.checkData.bind(this)}>
                    <div className={style['dataCard-top']}>{date}</div>
                    <div className={style['dataCard-bottom']}>{weekday}</div>
                </div>
            </div>
        );
    }
}

export default DataCard;
