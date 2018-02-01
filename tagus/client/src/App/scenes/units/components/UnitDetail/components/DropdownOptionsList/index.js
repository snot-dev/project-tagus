import React, { Component } from 'react';
import AddLink from '../../../../../../components/AddLink';
import './dropdownOptionsList.css';

class DropdownOptionsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addingOption: false
        };
    }

    renderOptions() {
        return(
            <ul className="tagus-drowpdown-options-list col-xs-12">
                {this.props.options.map((option, index) => {
                    return (
                        <li key={index} className="tagus-drowpdown-options-list-item row">
                            <div className="col-xs-12 col-sm-6">
                                <label className="tagus-label">Label:</label>{option.label}
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <label className="tagus-label">Value:</label>{option.value}
                            </div>
                        </li>
                    );
                })}
            </ul>
        )
    }

    render() {
        return(
            <div className="tagus-dropdown-options-list">
                <label className="tagus-label">Options</label>
                {this.renderOptions()}
                <AddLink text="Add new Option" show={!this.state.addingOption} disabled={this.state.addingOption} />
            </div>
        )
    }
}

export default DropdownOptionsList;