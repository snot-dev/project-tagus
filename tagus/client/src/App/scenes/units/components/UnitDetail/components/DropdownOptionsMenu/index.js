import React, { Component } from 'react';
import _ from 'lodash';
import Menu from '../../../../../../components/Menu';
import AddLink from '../../../../../../components/AddLink';
import './dropdownOptionsMenu.css';

class DropdownOptionsMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            submited: false,
            valid: false,
            timesSubmited:0,
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
        if(!this.state.touched) {
            this.setState({
                touched: true
            });
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
 
    _render() {
        return(
            <Menu title="Dropdown List Options" className="col-xs-6" onCloseButton={this.props.onClose} >
                <div className="fluid-container tagus-dropdown-menu-options-list">
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

                </div>           
            </Menu>
        );
    }

    render() {
        return this.props.show ? this._render() : null;
    }
}

export default DropdownOptionsMenu;