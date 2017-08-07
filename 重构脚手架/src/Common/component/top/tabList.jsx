/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import Tab from './tab';
import {fetchMenu} from '../../../Action/register/userActions';

class TabList extends Component {
	constructor(props) {
        super(props);
        this.state={
        	menu: [],
        	checkedIndex: -1
        }
    }
    componentWillMount() {
        fetchMenu().then(res=>{
            return res.json();
        }).then(data=>{
            if(data.code == 0){
                // data.data.map((item, index) => {
                //     this.setState({menu: this.state.menu.concat({
                //         name: item.name,
                //         url: (item.url.indexOf('.htm') >= 0)?(global.domainHis+item.url) : item.url,
                //         checked: (index == (data.data.length-1))
                //     })})
                // })
                // this.setState({checkedIndex: data.data.length-1})
                data.data.map((item, index) => {
                    this.setState({menu: this.state.menu.concat({
                        name: (item.url.indexOf('#/register') >= 0)?'门诊挂号':item.name,
                        url: (item.url.indexOf('#/register') >= 0)?item.url : (global.domainHis+item.url),
                        checked: (item.url.indexOf('#/register') >= 0)
                    })})
                    if(item.url.indexOf('#/register') >= 0)this.setState({checkedIndex: index})
                })
                // this.setState({checkedIndex: data.data.length-1})
            } else if (data.code == 1) {
                global.message.error(data.msg);
            } else{
                global.message.error('系统异常');
                console.log(data.msg)
            }
        }).catch(err=>console.log(err));
    }
    clickTab(e){
    	let index = this.state.checkedIndex;
    	if(e === index)return;
        let arr = this.state.menu;
        arr[e].checked = true;
        arr[index].checked = false;
    	this.setState({
    		menu: arr,
    		checkedIndex: e
    	})
    }
    render() {
        let {title, placeHolder, titleStyle, inputStyle, wrapStyle} = this.props;
        return (
            <ul id='tabList' className={style['tabList']}>
                {
	                this.state.menu.map((item, index) =>
	                    <Tab item={item} index={index} cb={this.clickTab.bind(this)}/>
	                )
	            }
            </ul>
        );
    }
}

export default TabList;
