/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import Selects from 'antd/lib/select';
import style2 from "antd/lib/select/style/css";
import {focusDom} from '../../../Action/register/registerActions';

class SelectItem extends Component {
    onselect(val){
        let {cb} = this.props;
        cb(val, this.filterType); // 传回两个参数给父组件，一个是当前选中值，一个是当前select的过滤类型filterType，可选
        let id;
        let arr = global.fixGetElementsByClassName('ant-select-selection');
        let curReactId = global.fixGetElementsByClassName('ant-select-selection', document.getElementById(this.props.info.id))[0].getAttribute('data-reactid');
        arr.map((item,index)=>{
            if(item.getAttribute('data-reactid') == curReactId && (index+1 < arr.length)){
                id = arr[index+1].parentNode.parentNode.id;
                setTimeout(()=>{
                    focusDom(id, 'ant-select-selection')
                }, 100)
            }
        })
    }
    blurS(e){
        let dom = document.getElementById(this.props.info.id);
        if(dom && global.fixGetElementsByClassName('ant-select-open', dom).length > 0)
        global.fixGetElementsByClassName('ant-select-selection', dom)[0].click();

    }
    render() {
        let {info} = this.props;
        let cln = global.setCln(info.size, style);
        this.filterType = info.filterType;
        if(!info.options) info.options = [];
        return (
            <div className={cln.wrap} id={info.id} style={info.wrapStyle}>
                <span className={cln.span} style={info.titleStyle}>{info.title}:</span>
                <Selects ref = {info.id} onBlur={this.blurS.bind(this)} className={cln.item} placeholder={info.placeHolder} value={info.value} onSelect={this.onselect.bind(this)}>
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

export default SelectItem;
