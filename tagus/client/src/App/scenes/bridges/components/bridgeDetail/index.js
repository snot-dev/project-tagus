import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import {getBridgeDetailIfNeeded} from '../../../../services/bridges/actions'; 
import store from '../../../../services/store'  ;
import './bridgeDetail.css';

class  BridgeDetail extends Component {
    componentWillMount() {
        if(this.props.match.params.id) {
            store.dispatch(getBridgeDetailIfNeeded(this.props.match.params.id));
        }
    }

    render() {
        return (
            <Panel title={this.props.detail.name} className="col-xs-8 full-height">
            </Panel>
        )
    }
}

export default BridgeDetail;