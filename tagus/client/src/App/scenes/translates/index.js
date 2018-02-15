import React, { Component } from 'react';
import {connect} from 'react-redux';
import TranslatesList from './components/translatesList';
import store from '../../services/store';
import {getListIfNedeed} from '../../services/translates/actions';

class Translates extends Component {
    componentWillMount() {
        store.dispatch(getListIfNedeed());
    }

    render() {
        return (
            <section id="translates" className="full-height col-xs-12">
                <TranslatesList list={this.props.translates.list} fetchingList={this.props.translates.fetchingList} savingList={this.props.translates.savingList} />
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        translates: state.translates
    };
};
  
export default connect(mapStateToProps)(Translates);
