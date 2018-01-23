import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import {getBridgeDetailIfNeeded, saveBridge} from '../../../../services/bridges/actions'; 
import store from '../../../../services/store'  ;
import Overlay from '../../../../components/Overlay';
import './bridgeDetail.css';

class  BridgeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 0
        };
    }

    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getBridgeDetailIfNeeded(this.props.match.params.id));
        }
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    onSubmitContentBridge(formValues) {
        const updatedBridge = Object.assign(this.props.detail, {content: formValues});
        store.dispatch(saveBridge(updatedBridge));
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange.bind(this)} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={`${this.props.detail._id}_${tab.alias}_${index}`}>
                                <Form onSubmit={this.onSubmitContentBridge.bind(this)} name={tab.alias} defaultValues={this.props.detail.content[tab.alias]} fields={tab.fields} />
                            </Tab>
                        )
                    )
                }
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
                <Overlay show={this.props.savingDetail}/>
            </Panel>
        )
    }
}

export default BridgeDetail;