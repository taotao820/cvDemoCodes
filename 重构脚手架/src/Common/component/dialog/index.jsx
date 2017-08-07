/**
 * Created by xuhuitao on 2017/05/12.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import style from "./style";
import classNames from "classnames";

class Dialog extends Component {
  render() {
    let { dialogTitle, csDialog, icon } = this.props;
    return (
      <div className={style["dialog-tit"]}>
        <img
          className={style["tit-icon"]}
          src={require("../../img/icon_" + icon + ".png")}
        />
        <span className={style["txt"]}>{dialogTitle}</span>
        <img
          className={style["close"]}
          src={require("../../img/icon_close.png")}
          onClick={csDialog}
        />
      </div>
    );
  }
}

export default Dialog;
