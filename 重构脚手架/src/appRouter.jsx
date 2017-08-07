import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, History,IndexRoute,hashHistory} from "react-router";
import App from './app';
import Register from './Views/register';
import Login from './Views/login'
import './Common/js/config';
import './Common/js/common';

export default class AppRouter extends Component {
	render() {
		return (
			<Router history={hashHistory}>
                <Route path="/" component={App}>
                	<IndexRoute component={Login}/>
                    <Route path="/register" component={Register}/>
        		</Route>
			</Router>
		);
	}
}