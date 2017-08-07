
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import {SHOW_TOP, HIDE_TOP} from '../../Common/js/constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {userName:'', password:''};
    }
    componentWillMount() {
        this.props.dispatch({
            type: HIDE_TOP
        })
    }
    handleLogin() {
        fetch(`${global.host}doLogin?jobNo=${this.state.userName}&password=${this.state.password}&deptCode=${this.state.deptId}`).then(res=>{
            return res.json();
        }).then(data=>{
            if(data.code == 0){
                window.sessionStorage.setItem('token', data.data.token);
                window.sessionStorage.setItem('deptId', data.data.deptId);
                global.token = data.data.token;
                const path = '/register';
                this.props.history.pushState(null, path)
            }
        }).catch(err=>console.log(err));
    }
    handleUserName(e) { this.setState({ userName:e.target.value }) }
    handlePassword(e) { this.setState({password:e.target.value}) }
    handleDeptId(e) { this.setState({deptId:e.target.value}) }
    render() {
        return (
            <div id="login" className={style['login']}>
                <h2 className={style['login_tip']}>一个可用账号,0110&1&9053</h2>
                <div className={style['login_card']}>
                    <i></i>
                    <input placeholder="账号" type="text" maxLength="18" onChange={this.handleUserName.bind(this)} value={this.state.userName}/>
                </div>
                <div className={style['login_password']}>
                    <i></i>
                    <input placeholder="密码" type="password" maxLength="18" onChange={this.handlePassword.bind(this)} value={this.state.password}/>
                </div>
                <div className={style['login_password']}>
                    <i></i>
                    <input placeholder="科室编码" type="text" maxLength="18" onChange={this.handleDeptId.bind(this)} value={this.state.deptId}/>
                </div>
                <div className={style['login_btn']}>
                    <a onClick={this.handleLogin.bind(this)}>登 录</a>
                </div>
            </div>
        );
    }
}

export default connect()(Login);
