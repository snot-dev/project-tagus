import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import {getUnitDetailIfNeeded} from '../../../../../../services/units/actions';
import store from '../../../../../../services/store';
import './unitsDetail.css';

class UnitsDetail extends Component {

    componentWillMount() {
        if (this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(this.props.match.params.id));
        }
    }

    shouldComponentUpdate(props) {
        return props.match.params.id !== this.props.detail._id;
    }

    componentWillUpdate(newProps) {
        if(newProps.match.params.id !== this.props.match.params.id) {
            store.dispatch(getUnitDetailIfNeeded(newProps.match.params.id));
        }
    }

    render() {
        return (
            <Panel title={`${this.props.detail.name}`} className="col-xs-8 full-height">
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsDetail;   