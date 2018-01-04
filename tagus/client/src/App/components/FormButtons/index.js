import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './formButtons.css';

class FormButtons extends Component {
    render() {
        const disabled = this.props.disabled ? "disabled" : '';
        
        return (
            <div className="row">
                <div className="tagus-form-button-container col-xs-12">
                    <Button disabled={this.props.disabled} onClick={this.props.onSubmit} type="button" className={`pull-right ${disabled}`} bsStyle={"primary"}>Save</Button>
                    <Button disabled={this.props.disabled} onClick={this.props.onReset} className={`pull-left ${disabled}`}>Cancel</Button>
                </div>
            </div>
        );
    }
}

FormButtons.propTypes = {
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
};

export default FormButtons;