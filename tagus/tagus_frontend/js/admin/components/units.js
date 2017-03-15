import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import UnitsList from './units/list';
import {getUnitsListIfNecessary, getUnitDetailIfNeeded} from '../actions/unitsActions';

class Units extends React.Component {
    componentWillMount() {
        store.dispatch(getUnitsListIfNecessary());

        if(this.props.params.id) {
            console.warn("here");
            store.dispatch(getUnitDetailIfNeeded(this.props.params.id));
        }
    };

    render() {
        return (
            <div className="row">
                <UnitsList units={this.props.units.list} fetchingUnitsList ={this.props.units.fetchingUnitsList} />
                {this.props.children ?  React.cloneElement(this.props.children, {unit: this.props.units.detail}) : null}
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