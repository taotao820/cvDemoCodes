/**
 * Created by xuhuitao on 2017/05/15.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import Pagination from "antd/lib/pagination";
import style1 from "antd/lib/pagination/style/css";
import style2 from "../../css/static/table";
import PageTool from "../../../Common/component/pageTool/pagetool";
class PagePart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageInfo: this.props.pageInfo,
			showTotalBar:this.props.showTotalBar,
            inputIndex:""
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.pageInfo != nextProps.pageInfo) {
            this.setState({ pageInfo: nextProps.pageInfo,inputIndex: nextProps.pageInfo.pageIndex});
        }
		if (this.state.showTotalBar != nextProps.showTotalBar) {
            this.setState({ showTotalBar: nextProps.showTotalBar });
        }
    }
	onHandlePageChange(pageNumber) {
        this.state.pageInfo.pageIndex = pageNumber;
        this.setState({
            pageInfo: this.state.pageInfo,
            inputIndex:this.state.pageInfo.pageIndex
        });
		this.props.onChange(this.state.pageInfo);
    }
    onPageTo(page){
        this.state.pageInfo.pageIndex = page;
        this.setState({
            pageInfo: this.state.pageInfo
        });
        this.props.onChange(this.state.pageInfo);
    }
    render() {
        return (
            <div className={style["wrap"]}>
                        {/*<div className={style["pagination"]} id="registerPage">
                            <Pagination id="page"
                              defaultCurrent={1}
                              total={this.state.pageInfo.total}
                              pageSize={this.state.pageInfo.pageSize}
                              current={this.state.pageInfo.pageIndex}
                              onChange={this.onHandlePageChange.bind(this)}
                              showTotal={total => "共" + total + "条 "}
                          />
                        
                          
                          
                      </div>*/}
                    {this.state.showTotalBar
                    
                    ?<div className={style["pagination"]} id="registerPage"> 
                        <PageTool option={this.state.pageInfo} onPageTo={this.onPageTo.bind(this)}/></div>
                    : null}
            </div>
        );
    }
}
export default PagePart;
