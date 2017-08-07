require('./polyfills.js');
import React from "react";
import { render } from "react-dom";
import AppRouter from "./appRouter";
import { Provider } from 'react-redux';
import HrbStore from './Reducer/hrbStore';
render(
	<Provider store={HrbStore}>
		<AppRouter />
	</Provider>,
	document.getElementById("root")
);