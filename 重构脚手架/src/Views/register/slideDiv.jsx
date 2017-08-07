import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from "classnames";
import Table from "./atom/table";

class SlideDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    slideClickHandler(e) {
        this.setState({
            open: true
        });
        // e.cancelBubble && e.cancelBubble();
        // e.stopPropagation && e.stopPropagation();
        // e.preventDefault();
    }
    closeClickHandler(e) {
        this.setState({
            open: false
        });
        // e.cancelBubble && e.cancelBubble();
        // e.stopPropagation && e.stopPropagation();
        // e.preventDefault();
    }
    render() {
        return (
            <div>
                <div className={style["register-left-slide"]} onClick={this.slideClickHandler.bind(this)}>
                    <span
                        className={
                            
                                style["span-cls"] +
                                " " +
                                style["cursor"]
                        }
                    >
                        {"挂"}<br />{"号"}<br />{"列"}<br />{"表"}
                    </span>
                </div>
                <div id='slideContainer'
                    className={this.state.open ? style["container"] : style["hide"]}>
                    <div
                        className={style["close"]}
                        onClick={this.closeClickHandler.bind(this)}
                    >
                        <img
                            className={style["img-cls"]}
                            src={require("../../Common/img/icon_arrow_left.png")}
                        />
                    </div>
                    {this.state.open ?<Table closeContainer={this.closeClickHandler.bind(this)}/>:null}
                </div>
            </div>
        );
    }
}

export default SlideDiv;
