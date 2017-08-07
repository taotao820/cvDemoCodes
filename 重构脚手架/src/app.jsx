import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./Common/css/common.scss";
import Top from "./Common/component/top";
import RecordDialog from "./Views/dialog/record/index"
import PrinterWin from "./Common/component/printerSelect";
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {myStates} = this.props;
        return (
            <div className={style["ehr"]}>
                {
                    () =>{
                        if(myStates.showTop){
                            return <Top />
                        }
                    }()
                }
              	{this.props.children}
              	{
    	            () =>{
    	                if(myStates.showCover){
    	                    return <div><div className={style["mask"]} /></div>
    	                }
    	            }()
            	}
                {
                    () =>{
                        if(myStates.showPrinterSel){
                            return  <PrinterWin></PrinterWin>
                        }
                    }()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {myStates} = state;
    return {
        myStates
    };
}
export default connect(mapStateToProps)(App);
