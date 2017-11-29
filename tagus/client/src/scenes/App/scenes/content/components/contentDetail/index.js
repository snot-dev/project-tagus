import React, { Component } from 'react';
import {getContentDetailIfNeeded, saveContent} from '../../../../../../services/content/actions';
import {Tabs, Tab} from 'react-bootstrap';
import store from '../../../../../../services/store';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import ContentForm from './components/contentForm';
import './contentDetail.css';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1
        }

        this.settingsFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true,
                disabled: false
            },
            {
                name: "Alias",
                type: "text",
                alias: "alias",
                required: true,
                disabled: true
            },
            {
                name: "Url",
                type: "text",
                alias: "url",
                required: true,
                disabled: true
            },
            {
                name: "Edited",
                type: "text",
                alias: "edited",
                required: true,
                disabled: true
            },
            {
                name: "Created",
                type: "text",
                alias: "created",
                required: true,
                disabled: true
            },
            {
                name: "Template",
                type: "text",
                alias: "template",
                required: true,
                disabled: false
            },
            {
                name: "Partial",
                type: "text",
                alias: "partial",
                required: true,
                disabled: true
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published",
                required: false,
                disabled: true
            },
            {
                name: "Nav",
                type: "checkbox",
                alias: "nav",
                required: false,
                disabled: true
            }
        ];
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
    }
    
    onSubmit(content) {
        store.dispatch(saveContent(content));
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    _getSettingsDefaultValues() {
        const defaultValues = {};

        for(const field of this.settingsFields) {
            defaultValues[field.alias] = this.props.detail[field.alias];
        }

        return defaultValues;
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                                <ContentForm detail={this.props.detail} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                            </Tab>
                        )
                    )
                }
                <Tab eventKey={tabs.length} key={`${this.props.detail._id}_Settings_${tabs.length}`} title='Settings'>
                    <ContentForm onSubmit={this.onSubmit} name='settings' defaultValues={this._getSettingsDefaultValues()} fields={this.settingsFields} unit={this.props.unit} detail={this.props.detail} />
                </Tab>
            </Tabs>
        )
    }

    render() {
        return (
            <Panel header={this.props.detail.name} className="col-xs-8 full-height">
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