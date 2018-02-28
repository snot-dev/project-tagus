import React, { Component } from 'react';
import {connect} from 'react-redux';
import Gallery from './components/gallery';
import Panel from '../../components/Panel';
import store from '../../services/store';
import {getMedia} from '../../services/media/actions';

class Media extends Component {
    componentDidMount() {
        store.dispatch(getMedia());
    }

    render() {
        return (
            <section id="media" className="col-xs-12 full-height">
                <Panel title={this.props.name} className="col-xs-12 full-height">
                    <Gallery images={this.props.media.list} />
                </Panel>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
      media: state.media
    };
  };
  
export default connect(mapStateToProps)(Media);