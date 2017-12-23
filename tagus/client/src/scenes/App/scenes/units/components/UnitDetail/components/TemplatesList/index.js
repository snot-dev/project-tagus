import React, { Component } from 'react';
import './templatesList.css';

class TemplatesList extends Component {
    _createArrayOfValues(arr) {
        const values = [];

        for(const item of arr) {
            values.push(item.value);
        }

        return values;
    }

    _onChange(e) {
        if(this.props.onChange) {
            this.props.onChange();
        }

    }

    _renderTemplates() {
        return (
            <div className="col-xs-12 tagus-form-field">
                {this.props.templates.map((template, index) => {
                    const checked = this.props.unitTemplates.includes(template);
                    return (
                        <div key={index} >
                            <label className="tagus-checkbox-list-label"><input onChange={this._onChange.bind(this)} defaultChecked={checked} className="tagus-input checkbox tagus-checkbox-list-item" type="checkbox" name="templates" value={template}/>{template}</label>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="row tagus-form-control" >
                <div className="col-xs-12">
                    <label className="tagus-label">Templates</label>
                </div>
                {this._renderTemplates()}
            </div>
        );
    }
}

export default TemplatesList;