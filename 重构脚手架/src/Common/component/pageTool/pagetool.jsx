import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import style from "./pagetool.scss";

class PageTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      pageInput: 1,
      inputIndex:""
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    this.setState({
        pageInput: nextProps.option.pageIndex,
        inputIndex:nextProps.option.pageIndex
    });
  }
  calculatePage() {
    //从父容器取值
    var option = this.props.option;
    var total = ~~option.total,
      pageIndex = ~~option.pageIndex,
      pageSize = ~~option.pageSize; //总数,当前页，每页容量
    var pagesTotal = 0; // 总页数初始化
    var currentPage = pageIndex; // 显示页码默认为参数中的页码
    var prevFlag=false;
    var lastFlag=false;
    var p,l;
    // 计算总页数
    var remainder = total % pageSize;
    if (remainder == 0) {
      pagesTotal = total / pageSize; //总条数不满pageSize为0
    } else {
      pagesTotal = (total - remainder) / pageSize + 1; //总页数 不满一页+1
    }

    // 当前页有效性检测
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > pagesTotal) {
      currentPage = pagesTotal;
    }

    // 1. 当前页码往前计算
    var prvnos = [];
    var temp = currentPage;
    while (true) {
      temp--;
      if (temp > 0) {
        prvnos.unshift(temp); // 数组头上增加一个页码
      } else {
        break;
      }
      // 最长不能超过8个
      if (prvnos.length == 6) {
        break;
      }
    }
    // 2. 往后计算页码
    var tailnos = [];
    temp = currentPage;
    while (true) {
      temp++;
      if (temp <= pagesTotal) {
        tailnos.push(temp); // 数组尾上增加一个页码
      } else {
        break;
      }
      // 最长不能超过8个
      if (tailnos.length == 6) {
        break;
      }
    }
      if (prvnos.length > 3) p=true;
      if (tailnos.length > 3) l=true;
    while (prvnos.length + tailnos.length > 8) {
      if (prvnos.length > 3) {
        prvnos.shift();
        continue;
      }
      if (tailnos.length > 3) {
        tailnos.pop();
        continue;
      }
    }
    prvnos.push(currentPage);
    return {
      total: total, // 总数
      index: currentPage, // 当前页
      pagesTotal: pagesTotal, // 总页数
      pages: prvnos.concat(tailnos), // 页码数组
      prevFlag:p,
      lastFlag:l
    };
  }
  inputHandler(event) {
    var str = event.target.value;
    var nst = "";
    for (var i = 0; i < str.length; i++) {
      var cd = str.charCodeAt(i);
      if (cd > 47 && cd < 58) {
        nst += str[i];
      }
    }
    this.setState({
      inputIndex: nst
    });
  }
  inputKeyPress(event) {
    if (event.key == "Enter") {
      this.state.pageIndex = this.state.inputIndex;
      this.setState({
        pageIndex:this.state.pageIndex
      });
      this.jump(this.state.pageIndex);
    }
  }
  jump(page) {
    page = ~~page;
    if (page < 1) {
      page = 1;
    } else if (page > this.state.pageInfo.pagesTotal) {
      page = this.state.pageInfo.pagesTotal;
    }
    this.props.onPageTo(page);
    this.setState({
      pageIndex: page,
      pageInput: page
    });
  }
  render() {
    var pageInfo = this.calculatePage();
    var prevFlag=pageInfo.prevFlag;
    var lastFlag=pageInfo.lastFlag;
    delete pageInfo.prevFlag;
    delete pageInfo.lastFlag;
    this.state.pageInfo = pageInfo;
    if (pageInfo.total == 0) {
      return <div className={style["hide"]} />;
    }
    return (
      <div className={style["pagetool"]}>
        <span className={style["totalSpan"]}>共{pageInfo.total}条记录，共{pageInfo.pagesTotal}页&nbsp;</span>
        <span>
          <img src={require("../../img/page-left-arrow.png")}/>
        </span>
        {
          prevFlag?<span><img src={require("../../img/icon_points.png")}/></span>:null
        }
        {pageInfo.pages.map(
          function(page) {
            return (
              <span
                key={page}
                className={
                  page == this.state.pageInput
                    ? style["page-no"] + " " + style["active"]
                    : style["page-no"]
                }
                onClick={this.jump.bind(this, page)}
              >
                {page}
              </span>
            );
          }.bind(this)
        )}
        {
          lastFlag?<span><img src={require("../../img/icon_points.png")}/></span>:null
        }
        <span>
          <img src={require("../../img/page-right-arrow.png")}/>
        </span>

        <span className={style["jump"]}>

          <div>          
            跳至
            <input
              type="text"
              className={style["page-index"]}
              value={this.state.inputIndex}
              onChange={this.inputHandler.bind(this)}
              onKeyPress={this.inputKeyPress.bind(this)}
              
            />页
          </div>
        </span>
      </div>
    );
  }
}
module.exports = PageTool;
