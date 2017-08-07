/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import Right from './topRight';
import {fetchUserInfo} from '../../../Action/register/userActions';

class Top extends Component {
    componentWillMount() {
        fetchUserInfo();
    }
    render() {
        let {user} = this.props;
        return (
            <div id='top' className={style['top']}>
                <div className={style['top-img']}></div>
                <div className={style['top-dept']}>
                    <div className={style['top-dept_up']}>
                        <span>{user.hosnum}</span>
                        <b>{user.hosnum}</b>
                    </div>
                    <div className={style['top-dept_down']}>
                        <span></span>
                        <span>{user.deptname}</span>
                    </div>
                </div>
                <Right info={user}></Right>
                <div className={style['clear']}></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {user} = state;
    return {
        user
    };
}
export default connect(mapStateToProps)(Top);
