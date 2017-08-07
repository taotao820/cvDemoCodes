import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import style from "./datagrid.scss";
import Scroll from "../scrolldiv/scrolldiv.jsx";
import PageTool from "../pageTool/pagetool.jsx";

var Item = React.createClass({
  render: function() {
    var option = this.props.option;
    return (
      <tr>
        <td width="20%">
          <span className={style["ellipsis"]}>{option["id"]}</span>
        </td>
        <td width="30%">
          <span className={style["ellipsis"]}>{option["appointment"]}</span>
        </td>
        <td width="20%">
          <span className={style["ellipsis"]}>{option["name"]}</span>
        </td>
        <td width="96px" className={style["ellipsis"]}>
          {option["rehostime"]}
        </td>
      </tr>
    );
  }
});
/*表头 排序 下拉等待处理*/
var Th = React.createClass({
  render: function() {
    var option = this.props.option;
    var width = option.width || "initial";
    return (
      <th width={width} className="">
        <span>
          {option.name}
        </span>
      </th>
    );
  }
});
/*表身*/
var Tbody = React.createClass({
  render: function() {
    return (
      <table>
        <tbody>
          {this.props.option.map(
            function(item, index) {
              var option = item;
              return <Item key={index} option={option} />;
            }.bind(this)
          )}
        </tbody>
      </table>
    );
  }
});
class Datagrid extends Component {
  onPageTo(page) {
    this.props.eventListener("page", page);
  }
  render() {
    var headOpt = [
      {
        key: "id",
        name: "号别",
        width: "20%"
      },
      {
        key: "appointment",
        name: "预约时间",
        width: "30%"
      },
      {
        key: "name",
        name: "姓名",
        width: "20%"
      },
      {
        key: "rehostime",
        name: "挂号时间",
        width: "96px"
      }
    ];
    var list = [];
    for (var i = 0; i < 3; i++) {
      list.push({
        id: "10" + i,
        name: "詹姆斯" + i,
        appointment: "2017-05-04",
        rehostime: "2017-05-04 10:00:" + i
      });
    }
    // var pageInfo={
    //         pageSize: 6,
    //         pageIndex: 1,
    //         total: 6
    // };
    var cls = style["ai-datagrid"];
    var tableElement = <Tbody option={list} />; //表身
    var mainElement = tableElement;

    mainElement = <Scroll content={tableElement} />;

    if (this.props.pageInfo) {
      cls.push(" " + "page");
    }

    return (
      <div className={style["ai-datagrid"]}>
        <div className={style["dr-hd"]}>
          <table width="100%">
            <thead>
              <tr>
                {headOpt.map(
                  function(head) {
                    return <Th key={head.key} option={head} />;
                  }.bind(this)
                )}
              </tr>
            </thead>
          </table>
        </div>
        <div className={style["dr-bd"]}>
          {list.length == 0
            ? <div>
                <span>暂无数据</span>
              </div>
            : mainElement}
        </div>
        <div className={style["dr-ft"]}>
          {<PageTool />}
        </div>
      </div>
    );
  }
}
module.exports = Datagrid;
