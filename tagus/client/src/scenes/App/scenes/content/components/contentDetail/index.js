import React, { Component } from 'react';
import {getContentDetailIfNeeded, saveContent} from '../../../../../../services/content/actions';
import {Tabs, Tab} from 'react-bootstrap';
import store from '../../../../../../services/store';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import ContentForm from './components/contentForm';
import ContentSettings from './components/contentSettings';
import './contentDetail.css';

class ContentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1
        }
    }
    
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    _handleTabchange(key) {
        this.setState({key});
    }

    shouldComponentUpdate(props) {
        const hasNeededContent = this.props.match.params.id === props.detail._id && props.unit._id;
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

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                                <ContentForm onSubmit={this.onSubmit} detail={this.props.detail} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                            </Tab>
                        )
                    )
                }
                <Tab eventKey={tabs.length} key={`${this.props.detail._id}_Settings_${tabs.length}`} title='Settings'>
                    <ContentSettings />
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