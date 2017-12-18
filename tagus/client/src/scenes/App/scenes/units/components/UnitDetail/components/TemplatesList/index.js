import React, { Component } from 'react';
import './templatesList.css';

class TemplatesList extends Component {
    _renderTemplates() {
        return (
            <div className="col-xs-12 tagus-form-field">
                    {this.props.templates.map((template, index) => {
                    return (
                        <div key={index} >
                            <label className="tagus-checkbox-list-label"><input className="tagus-input checkbox tagus-checkbox-list-item" type="checkbox" name="templates" value={template.value}/>{template.label}</label>
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