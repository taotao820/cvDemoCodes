/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import InputItem from '../../../Common/component/inputItem';
import Btn from '../../../Common/component/button';
import {setInvoiceNo} from '../../../Action/register/registerActions';

class ChangeInvoice extends Component {
    constructor(props) {
        super(props);
        this.state={
            invoiceNo : ''
        }
    }
    onInputChange(e){
        if(!global.regExpString(e, 'number'))global.message.warning('发票号只能是数字,不能为空');
        this.setState({
            invoiceNo: e
        })
    }
    confirmBtn(){
        let {invoice} = this.props;
        let index = invoice.currentInvoiceNoRange.indexOf('～');
        let start = invoice.currentInvoiceNoRange.substring(0, index);
        let end = invoice.currentInvoiceNoRange.substring(index+1);
        if(this.state.invoiceNo <= 0){
            global.message.warning('新发票号不能为空');
            return
        }
        if(!global.regExpString(this.state.invoiceNo, 'number')){
            global.message.warning('新发票号只能是数字');
            return;
        }
        if(this.state.invoiceNo <= start || this.state.invoiceNo > end){
            global.message.warning('新发票号必须在票区内');
            return
        }
        let length1 = invoice.currentInvoiceNo.length;
        let length2 = this.state.invoiceNo.length;
        let length3 = (Number(invoice.currentInvoiceNo)-1).toString().length;
        let length4 = (Number(this.state.invoiceNo)-1).toString().length;
        let currNo = this.add0(length1-length3,Number(invoice.currentInvoiceNo)-1);
        let newNo = this.add0(length2-length4,Number(this.state.invoiceNo)-1);
        setInvoiceNo(invoice.takeId, newNo);
    }
    add0(num,str){
        str = str.toString();
        for(let i = 1; i <= num; i++){
            str = '0' + str
        }
        return str
    }
    cancelBtn(){
        this.props.dispatch({type: 'HIDE_CHANGEINVOICE'});
        this.props.dispatch({type: 'HIDE_COVER'});
    }
    componentWillMount() {
    }
    render() {
        let {invoice} = this.props;
        let arr = [
            {
                title:'设置发票号',
                isClick: false,
                // value: date,
                type: 'input',
                size: 'big'
            },{
                title:'当前发票号',
                value: invoice.currentInvoiceNo,
                canEdit: true,
                type: 'input',
                size: 'big'
            },{
                title:'当前发票区间',
                isClick: false,
                canEdit: true,
                value: invoice.currentInvoiceNoRange,
                type: 'input',
                size: 'big'
            }
        ];
        return (
            <div className={style['changeInvoice']}>
                <div className={style['wrap']}>
                    {
                        arr.map((item,index)=>
                            <div className={style['item']}>
                                <InputItem info={item} cb={this.onInputChange.bind(this)}></InputItem>
                            </div>
                        )
                    }
                    <div className={style['btnWrap']}>
                        <div className={style['div']}>
                            <Btn title="确定" src="icon_putonfile.png" cbBtn={this.confirmBtn.bind(this)}></Btn>
                            <Btn title="取消" src="icon_Register.png" cbBtn={this.cancelBtn.bind(this)}></Btn>
                            <div className={style['clear']}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {invoice} = state;
    return {
        invoice
    };
}
export default connect(mapStateToProps)(ChangeInvoice);
