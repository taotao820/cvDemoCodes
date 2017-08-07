/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import Selects from 'antd/lib/select';
import style2 from "antd/lib/select/style/css";

class MultiSelect extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(val){
        let {cb} = this.props;
        cb(val.join(), this.filterType); // 传回两个参数给父组件，一个是当前选中值，一个是当前select的过滤类型filterType，可选
    }
    render() {
        let {info} = this.props;
        let cln = global.setCln(info.size, style);
        this.filterType = info.filterType;
        if(!info.options) info.options = [];
        let multiple=!!(info.multiple);
        return (
            <div className={cln.wrap} id={info.id} style={info.wrapStyle}>
                <span className={cln.span} style={info.titleStyle}>{info.title}:</span>
                <Selects multiple={multiple} className={cln.item} placeholder={info.placeHolder} onChange={this.handleChange.bind(this)} >
                    {
                        info.options.map((item, index) =>
                            <Option value={item.value}>{item.key}</Option>
                        )
                    }
                </Selects>
                <div className={style['clear']}></div>
            </div>
        );
    }
}

export default MultiSelect;
