import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {getBridgesListIfNeeded, getUnitsListIfNeeded} from '../../services/bridges/actions';
import store from '../../services/store';
import BridgeList from './components/bridgeList';
import BridgeDetail from './components/bridgeDetail';
import './bridges.css';

class Bridges extends Component {
    componentWillMount() {
        store.dispatch(getBridgesListIfNeeded());
        store.dispatch(getUnitsListIfNeeded());
    }

    render() {
        return (
            <section id="bridges" className="full-height col-xs-12">
                <BridgeList url={this.props.match.url} fetchingList={this.props.bridges.fetchingList} list={this.props.bridges.list} />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<BridgeDetail {...props} savingDetail={this.props.bridges.savingDetail} detail={this.props.bridges.detail} unit={this.props.bridges.units[this.props.bridges.detail.unitType]} />)} />
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