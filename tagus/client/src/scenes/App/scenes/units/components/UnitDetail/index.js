import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import './unitsDetail.css';

class UnitsDetail extends Component {
    render() {
        return (
            <Panel title="Detail" className="col-xs-8 full-height">
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsDetail;   