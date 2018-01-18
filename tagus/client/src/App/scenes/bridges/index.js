import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import store from '../../services/store';
import BridgesList from './components/bridgesList';
import './bridges.css';

class Bridges extends Component {

    render() {
        return (
            <section id="bridges" className="full-height col-xs-12">
                <BridgesList />
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