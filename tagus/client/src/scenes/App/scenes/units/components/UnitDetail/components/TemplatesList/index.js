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
        const templates = this._createArrayOfValues(this.props.templates);
        const unitTemplates = this._createArrayOfValues(this.props.unitTemplates);


        return (
            <div className="col-xs-12 tagus-form-field">
                {this.props.templates.map((template, index) => {
                    const checked = unitTemplates.includes(templates[index]);
                    return (
                        <div key={index} >
                            <label className="tagus-checkbox-list-label"><input onChange={this._onChange.bind(this)} defaultChecked={checked} className="tagus-input checkbox tagus-checkbox-list-item" type="checkbox" name="templates" value={template.value}/>{template.label}</label>
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