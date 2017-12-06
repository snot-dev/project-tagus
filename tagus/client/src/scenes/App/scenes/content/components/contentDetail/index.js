import React, { Component } from 'react';
import {getContentDetailIfNeeded, saveContent} from '../../../../../../services/content/actions';
import {Tabs, Tab} from 'react-bootstrap';
import store from '../../../../../../services/store';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import './contentDetail.css';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0
        };

        this.propertiesFields = [];
    }
    
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    
    shouldComponentUpdate(props) {
        const hasNeededContent = props.detail && props.unit && this.props.match.params.id === props.detail._id && props.unit._id;
        const processingSave = props.savingContent !== this.props.savingContent;
        
        return hasNeededContent || processingSave;
    }
    
    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(newProps.match.params.id));
        }

        const templates = newProps.unit ?  newProps.unit.templates : {};
        this.propertiesFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            },
            {
                name: "Url",
                type: "text",
                alias: "url",
                required: true
            },
            {
                name: "Created",
                type: "text",
                alias: "created",
                required: true
            },
            {
                name: "Template",
                type: "select",
                alias: "template",
                options: templates,
                required: true
            },
            {
                name: "Partial",
                type: "select",
                alias: "partial",
                options: templates
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published"
            },
            {
                name: "Nav",
                type: "checkbox",
                alias: "nav"
            }
        ];
    }
    
    onSubmitContent(formValues) {
        const newContent = Object.assign(this.props.detail.content, formValues);
        this.props.detail.content = newContent;
        store.dispatch(saveContent(this.props.detail));
    }
    
    onSubmitProperties(formValues) {
        const newContent = Object.assign(this.props.detail, formValues.properties);
        store.dispatch(saveContent(newContent));
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    _getPropertiesDefaultValues() {
        const defaultValues = {};

        for(const field of this.propertiesFields) {
            defaultValues[field.alias] = this.props.detail[field.alias];
        }

        return defaultValues;
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                                <Form onSubmit={this.onSubmitContent.bind(this)} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                            </Tab>
                        )
                    )
                }
                <Tab eventKey={tabs.length} key={`${this.props.detail._id}_Properties_${tabs.length}`} title='Properties'>
                    <div className="container-fluid tagus-form-info-fields">
                        <div className="row tagus-form-control">
                            <div className="col-xs-12 col-sm-6 tagus-form-field">
                                <label className="tagus-label" >Alias</label>
                                <p className="tagus-info">{this.props.detail.alias}</p>
                            </div>
                            <div className="col-xs-12 col-sm-6 tagus-form-field text-right">
                                <label className="tagus-label" >Created</label>
                                <p className="tagus-info">{this.props.detail.created}</p>
                            </div>
                        </div>
                        <div className="row tagus-form-control">
                            <div className="col-xs-12 col-sm-6 tagus-form-field">
                                <label className="tagus-label" >Unit</label>
                                <p className="tagus-info">{this.props.unit.name}</p>
                            </div>
                        </div>
                    </div>
                    <Form onSubmit={this.onSubmitProperties.bind(this)} name="properties" defaultValues={this._getPropertiesDefaultValues()} fields={this.propertiesFields} /> 
                </Tab>
            </Tabs>
        )
    }

    render() {
        return (
            <Panel title={this.props.detail.name} className="col-xs-8 full-height">
                {
                    this.props.unit
                    ? this._renderTabs(this.props.unit.tabs)
                    : null
                }
                <Overlay show={this.props.savingContent}/>
            </Panel>  
        );
    };
}

export default ContentDetail;