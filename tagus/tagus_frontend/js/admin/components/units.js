import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import UnitsList from './units/list';
import {getUnitsListIfNecessary} from '../actions/unitsActions';

class Units extends React.Component {
    componentWillMount() {
        store.dispatch(getUnitsListIfNecessary());
    };


    render() {
        return (
            <div className="row">
                <UnitsList units={this.props.units.list} fetchingUnitsList ={this.props.units.fetchingUnitsList} />
            </div>
        );
    };
};

let mapStateToProps = function(state) {
  return {
    units:  state.units,
  };
};

export default connect(mapStateToProps)(Units);