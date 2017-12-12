import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {getUnitsListIfNeeded} from '../../../../services/units/actions';
import store from '../../../../services/store';
import UnitList from './components/UnitList';
import UnitDetail from './components/UnitDetail';
import './units.css';

class Units extends Component {
    componentWillMount() {
        store.dispatch(getUnitsListIfNeeded());
    }

    render() {
        console.warn(this.props);
        return (
            <section id="units" className="full-height col-xs-12">
                <UnitList url={this.props.match.url}  list={this.props.units.list} fetchingList={this.props.units.fetchingList} savingDetail={this.props.savingDetail} />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<UnitDetail {...props}  />)} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
      units: state.units
    };
  };
  
  export default connect(mapStateToProps)(Units);