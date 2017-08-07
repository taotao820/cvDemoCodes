/**
 * Created by tianjiachao on 2017/05/10.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import style2 from "antd/lib/radio/style/css";
import classNames from 'classnames';
import Radio from 'antd/lib/radio';
import {fetchCardList} from '../../../Action/register/registerActions';
const RadioGroup = Radio.Group;

class InputItem extends Component {
    onChange(e) {
        this.props.cb(e.target.value);
    }
    render() {
        let {cb, item, value} = this.props;
        return (
            <RadioGroup onChange={this.onChange.bind(this)} value={value}>
                {
                    item.map((atom, index) =>
                        <Radio value={atom.value}>{atom.key}</Radio>
                    )
                }
            </RadioGroup>
        );
    }
}

export default connect()(InputItem);