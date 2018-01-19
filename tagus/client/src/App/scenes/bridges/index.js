import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {getBridgesListIfNeeded} from '../../services/bridges/actions';
import store from '../../services/store';
import BridgesList from './components/bridgesList';
import './bridges.css';

class Bridges extends Component {
    componentWillMount() {
        store.dispatch(getBridgesListIfNeeded());
    }

    render() {
        return (
            <section id="bridges" className="full-height col-xs-12">
                <BridgesList fetchingList={this.props.bridges.fetchingList} list={this.props.bridges.list} />
            </section>
        );
    }
}


const mapStateToProps = state => {
    return {
      bridges: state.bridges
    };
  };
  
export default connect(mapStateToProps)(Bridges);