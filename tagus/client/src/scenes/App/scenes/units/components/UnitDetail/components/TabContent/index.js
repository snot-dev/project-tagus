import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import AddLink from '../../../../../../components/AddLink';
import './tabContent.css';

class TabContent extends Component {
    renderFields () {
        return (
            <div className="col-xs-12 tagus-unit-fields">
                {this.props.tab.fields.map((field, index) => {
                    return(
                        <div className="row tagus-form-field tagus-unit-field" key={`${field.alias}_${index}`}>
                            <div className="col-xs-12 col-sm-6" >
                                <label className="tagus-label">Name</label>
                                <p className="tagus-info">{field.name}</p>
                            </div>
                            <div className="col-xs-12 col-sm-6" >
                                <label className="tagus-label">Type</label>
                                <p className="tagus-info">{field.type}</p>
                            </div>
                            <div className="col-xs-12 col-sm-6" >
                                <label className="tagus-label">Alias</label>
                                <p className="tagus-info">{field.alias}</p>
                            </div>
                            <div className="col-xs-12 col-sm-6" >
                                <label className="tagus-label">Required</label>
                                <p className="tagus-info">{field.required.toString()}</p>
                            </div>
                        </div>
                    );
                })}
                <AddLink className="text-cent" show={true} text="Add a new Field" />
            </div>
        );
    }

    render() {
        return (
            <Tabs defaultActiveKey={0}  id={`tagus-unit-${this.props.tab.alias}`}  className="tagus-unit-tabs" >
                <Tab eventKey={0} title={`${this.props.tab.name}`} >
                    <div className="row tagus-form-control">
                        <div className="col-xs-12 tagus-form-field">
                            <label className="tagus-label">Alias</label>
                            <p className="tagus-info">{this.props.tab.alias}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label className="tagus-label">Fields</label>
                            {this.renderFields()}
                        </div>
                    </div>
                </Tab>
            </Tabs>  
        );
    }
}

export default TabContent;