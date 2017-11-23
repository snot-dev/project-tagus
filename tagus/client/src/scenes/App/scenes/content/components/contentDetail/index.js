import React, { Component } from 'react';
import {getContentDetailIfNeeded} from '../../../../../../services/content/actions';
import {Form, Text} from 'react-form';
import {Tabs, Tab} from 'react-bootstrap';
import store from '../../../../../../services/store';
import Panel from '../../../../components/Panel';
import ContentForm from './components/contentForm';
import './contentDetail.css';

class ContentDetail extends Component {
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.match.params.id));
        }
    }
    
    _handleTabchange(key) {
        this.setState({key});
    }


    shouldComponentUpdate(props) {
        return this.props.match.params.id === props.detail._id && props.unit._id;
    }

    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getContentDetailIfNeeded(newProps.match.params.id));
        }
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={this.props.detail._id+tab.alias+index}>
                                <ContentForm {...this.props} />
                            </Tab>
                        )
                    )
                }
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
            </Panel>  
        );
    };
}

export default ContentDetail;