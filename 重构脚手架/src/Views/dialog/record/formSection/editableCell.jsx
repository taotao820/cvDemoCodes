import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import classNames from "classnames";

import Table from "antd/lib/table";
import style2 from "antd/lib/table/style/css";
import Input from "antd/lib/input";
import style1 from "antd/lib/input/style/css";

import style3 from "../../../../Common/css/static/table";
import style from "../style.scss";
class EditableCell1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editable: this.props.editable || false,
            //cacheValue:""
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
                }
            }
            if (nextProps.status && nextProps.status !== this.props.status) {
                if (nextProps.status === 'save') {
                    this.props.onChange(this.state.value);
                } else if (nextProps.status === 'cancel') {
                    this.setState({ value: this.cacheValue });
                    this.props.onChange(this.cacheValue);
                }
            }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value
        );
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value});
        this.props.onChange(value);
    }
    render() {
        const value =this.state.value;
        const editable=this.state.editable;
        return (
            <div>
                {editable
                    ? <div>
                          <Input
                              value={value}
                              onChange={e => this.handleChange(e)}
                          />
                      </div>
                    : <div className="editable-row-text">
                          {value.toString() || " "}
                      </div>}
            </div>
        );
    }
}
export default EditableCell1;
