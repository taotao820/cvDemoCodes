/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';

class Tab extends Component {
    clickTab(){
        let {cb, index} = this.props;
        cb(index);
    }
    render() {
        let {item} = this.props;
        let cln = item.checked ? style['liChecked'] : style['liNormal']
        return (
            <li className={cln} onClick={this.clickTab.bind(this)}>
                {
                    // () => {
                    //     return <a href={item.url}>{item.name}</a>
                    // }()
                    (item.url.indexOf('#/register') >= 0)? item.name:<a href={item.url}>{item.name}</a>
                }
            </li>
        );
    }
}

export default Tab;
