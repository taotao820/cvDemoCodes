/*****************************************
带自定义滚动条的div
props:
content: 需要滚动的实际内容

注意: 父元素必须有具体的宽高,或定位
*****************************************/
import React, {
    Component,
    PropTypes
} from "react";
import classNames from 'classnames';
import style from "./scrolldiv.scss";

var Scroll = React.createClass({
	getInitialState: function() {
		return {
			top: 0,
			ch: 100,
			sh: 100
		}
	},
	render: function() {
		var display = "block";
		if (this.state.ch == this.state.sh) {
			display = "none";
		}
		var position = {
			top: this.state.top,
			bottom: this.state.top * -1,
			display: display
		};
		var siderPosition = {
			height: this.state.ch / this.state.sh * 100 + "%",
			top: this.state.top / this.state.sh * 100 + "%"
		}
		return (
			<div className="scroll-bd" style={position}>
				<div className="scroll-fp" style={siderPosition}></div>
			</div>
		);
	}
});
class ScrollDiv extends Component{
	constructor(props){
		super(props)
	}
	mouseWheel(event) {
		if (event.deltaY != 0) {
			var deltaY = 0;
			if (event.deltaY > 0) {
				deltaY = 100;
			} else {
				deltaY = -100;
			}
			event.currentTarget.scrollTop = event.currentTarget.scrollTop + deltaY;
			this.refs.scroll.setState({
				top: this.refs.main.scrollTop,
				ch: this.refs.main.clientHeight,
				sh: this.refs.main.scrollHeight
			});
		}
		event.preventDefault();
	}
	mouseOver(event) {
		this.refs.scroll.setState({
			top: this.refs.main.scrollTop,
			ch: this.refs.main.clientHeight,
			sh: this.refs.main.scrollHeight
		});
	}
	mouseOut(event) {
		this.refs.scroll.setState({
			top: this.refs.main.scrollTop,
			ch: this.refs.main.clientHeight,
			sh: this.refs.main.clientHeight
		});
	}
	render(){
		return(
			<div ref="main"
				className="ai-scrolldiv"
				onWheel={this.mouseWheel.bind(this)}
				onMouseOver={this.mouseOver.bind(this)}
				onMouseOut={this.mouseOut.bind(this)}>
				{this.props.content}
				<Scroll ref="scroll" />
			</div>
			)
	}
};
module.exports = ScrollDiv;