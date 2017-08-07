/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import CardList from './atom/cardList';
import Bar from './atom/bar';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style['content']}>
            	<div className={style['content-bar']}>
            		<Bar></Bar>
            	</div>
            	<div className={style['content-cardList']}>
            		<CardList></CardList>
            	</div>
            </div>
        );
    }
}

export default Content;
