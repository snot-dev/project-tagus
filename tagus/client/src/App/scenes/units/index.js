import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {getUnitsListIfNeeded} from '../../services/units/actions';
import store from '../../services/store';
import UnitList from './components/UnitList';
import UnitDetail from './components/UnitDetail';
import './units.css';

class Units extends Component {
    componentWillMount() {
        store.dispatch(getUnitsListIfNeeded());
    }

    render() {
        return (
            <section id="units" className="full-height col-xs-12">
                <UnitList url={this.props.match.url} list={this.props.units.list} fetchingList={this.props.units.fetchingList} savingDetail={this.props.savingDetail} />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<UnitDetail {...props} fetchingUnitFields={this.props.units.fetchingUnitFields} unitFields={this.props.units.unitFields} fetchingTemplates={this.props.units.fetchingTemplates} templates={this.props.units.templates} addingTab={this.props.units.addingTab} addingField={this.props.units.addingField} detail={this.props.units.detail} />)} />
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