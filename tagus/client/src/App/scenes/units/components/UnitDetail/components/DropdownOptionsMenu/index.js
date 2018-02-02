import React, { Component } from 'react';
import _ from 'lodash';
import Menu from '../../../../../../components/Menu';
import AddLink from '../../../../../../components/AddLink';
import FormButtons from '../../../../../../components/FormButtons';
import './dropdownOptionsMenu.css';

class DropdownOptionsMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            submited: false,
            timesSubmited:0,
            valid: true,
            options: [],
            fields: []
        };
    }

    componentWillReceiveProps(props) {
        if(props.field && props.field.options) {
            this.setState( {
                options: _.cloneDeep(props.field.options)
            });
        }
    }

    _onBlur(index) {
        return (e) => {
            const options = _.cloneDeep(this.state.options);

            options[index][e.target.name] = e.target.value;

            this.setState({
                options
            });
        }
    }

    _onChange() {
        const state = {};
        if(!this.state.touched) {
            state.touched = true;
        }

        if (!this.state.valid) {
            state.valid = true;
        }

        if (Object.keys(state).length > 0) {
            this.setState(state);
        }
    }

    _addNewOption() {
        const options = _.cloneDeep(this.state.options);

        options.push({
            value: '',
            label: ''
        });

        this.setState({options});
    }
 
    _validate() {
        let valid = true;
        for(const option of this.state.options) {
            if(!option.label || !option.value) {
                valid = false;
                break;
            }
        }

        if (valid) {
            this._onSubmit();
        } 
        else {
            this.setState({
                valid: false
            });
        } 

    }

    _onSubmit() {
        this.setState({
            valid: true, 
            submited: true,
            timesSubmited: this.state.timesSubmited+1
        });

        if(this.props.onOptionsSubmit) {
            this.props.onOptionsSubmit(this.state.options);
        }
    }

    _render() {
        return(
            <Menu title="Dropdown List Options" className="col-xs-6" onCloseButton={this.props.onClose} >
                <div className="fluid-container tagus-dropdown-menu-options-list">
                    {!this.state.valid 
                    ?  <div className="row"> <p className="tagus-dropdown-options-menu-error col-xs-12">You must fill every option!</p> </div>
                    : null }
                    {
                        this.state.options.map((option, i) => {
                            return (
                                <div key={`options_${i}`} className="row tagus-dropdown-menu-options-list-item">
                                    <div className="col-xs-12 col-sm-6">
                                        <label htmlFor="label" className="tagus-drodpdown-label">Label</label>
                                        <input name="label" type='text' className="tagus-dropdown-input" defaultValue={option.label} onChange={this._onChange.bind(this)} onBlur={this._onBlur(i)} />
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <label htmlFor="value" className="tagus-label">Value</label>
                                        <input name="value" type='text' className="tagus-dropdown-input" defaultValue={option.value} onChange={this._onChange.bind(this)} onBlur={this._onBlur(i)}/>
                                    </div>
                                </div>
                            );
                        })
                    }

                    <AddLink text="Add a new option" onClick={this._addNewOption.bind(this)} />
                    {this.state.options.length > 0 ? <FormButtons disabled={!this.state.touched} onSubmit={this._validate.bind(this)} /> : null}
                </div>           
            </Menu>
        );
    }

    render() {
        return this.props.show ? this._render() : null;
    }
}

export default DropdownOptionsMenu;