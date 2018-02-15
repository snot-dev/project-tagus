import React, { Component } from 'react';
import Panel from '../../../../components/Panel';
import Modal from '../../../../components/Modal';
import AddLink from '../../../../components/AddLink';
import Overlay from '../../../../components/Overlay';
import store from '../../../../services/store';

class TranslatesList extends Component {
    render() {
        console.warn(this.props);
        return (
            <Panel title="Translates" className="col-xs-6 full-height">
            <div>

                List will appear here
            </div>
            </Panel>
        )
    }
}

export default TranslatesList;