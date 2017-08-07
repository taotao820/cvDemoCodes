/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import Item from './cardItem';
import {addFilterItem, loadCodeData, fetchCardList, addCodeCard} from '../../../Action/register/registerActions';

class CardItem extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // this.props.dispatch(
        //     loadCodeData(
        //         [{
        //             dept: "妇产科",
        //             number: 23,
        //             docName: "张三",
        //             code: 105,
        //             type: "专家",
        //             time: "上午",
        //             scheduleDate: "1495152000000"
        //         }, {
        //             dept: "妇产科",
        //             number: 23,
        //             docName: "李四",
        //             code: 106,
        //             type: "普通",
        //             time: "上午",
        //             scheduleDate: "1495152000000"
        //         }, {
        //             dept: "妇产科",
        //             number: 23,
        //             docName: "王五",
        //             code: 107,
        //             type: "专家",
        //             time: "上午",
        //             scheduleDate: "1495152000000"
        //         }, {
        //             dept: "妇产科",
        //             number: 23,
        //             docName: "王明",
        //             code: 108,
        //             type: "专家",
        //             time: "下午",
        //             scheduleDate: "1495152000000"
        //         }, {
        //             dept: "妇产科",
        //             number: 23,
        //             docName: "王明",
        //             code: 109,
        //             type: "专家",
        //             time: "下午",
        //             scheduleDate: "1495152000000"
        //         }
        //     ]));
        let day = new Date();
        fetchCardList(day);
    }
    clickItem(code){
        this.props.dispatch(addCodeCard(code, this.props.regCodeList));
    }
    render() {
        let {regCodeList} = this.props;
        return (
            <div className={style['cardList']} id="cardList">
            {
                regCodeList.filtedList.map((item, i) =>
                    <div className={style['itemWrap']}>
                        <Item dept={item.dept}
                            number={item.number}
                            name={item.docName}
                            code={item.code}
                            type={item.type}
                            time={item.time}
                            cb={this.clickItem.bind(this)}>
                        </Item>
                    </div>
                )
            }
             <div className={style['clear']}></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {regCodeList} = state;
    return {
        regCodeList
    };
}
export default connect(mapStateToProps)(CardItem);
