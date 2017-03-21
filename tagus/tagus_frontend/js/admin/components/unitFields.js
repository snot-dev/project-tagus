import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getUnitsListIfNecessary} from '../actions/unitFieldsActions';
import UnitFieldsList from './unitFields/list';

class UnitFields extends React.Component {
    componentWillMount() {
        store.dispatch(getUnitsListIfNecessary());

        // if(this.props.params.id) {
        //     store.dispatch(getUnitDetailIfNeeded(this.props.params.id));
        // }
    };

    componentWillUpdate(nextProps) {
    };

    getUnitDetail(id) {
        // return () => {
        //     store.dispatch(getUnitDetailIfNeeded(id));
        // };
    };

    render() {
        return (
            <div className="row">
                <UnitFieldsList unitFields={this.props.unitFields.list} fetchingUnitFieldsList ={this.props.unitFields.fetchingList} getDetail={this.getUnitDetail} /> 
                {/*{this.props.children && Object.keys(this.props.units.detail).length > 0  ?  React.cloneElement(this.props.children, {unit: this.props.units.detail}) : null}*/}
            </div>
        );
    };
};

let mapStateToProps = function(state) {
  return {
    unitFields:  state.unitFields,
  };
};

export default connect(mapStateToProps)(UnitFields);