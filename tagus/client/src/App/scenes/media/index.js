import React, { Component } from 'react';
import Panel from '../../components/Panel';

class Media extends Component {
    render() {
        console.warn(this.props);
        return (
            <section id="media" className="col-xs-12 full-height">
                <Panel title={this.props.name} className="col-xs-12 full-height">
                    Media will appear here
                </Panel>
            </section>
        )
    }
}

export default Media;