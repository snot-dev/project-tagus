import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getContentListIfNeeded, getUnitsListIfNeeded} from '../../../../services/content/actions';
import {Route} from 'react-router-dom';
import store from '../../../../services/store';
import ContentList from './components/contentList';
import ContentDetail from './components/contentDetail';
import './content.css';

class Content extends Component {
    componentWillMount() {
        store.dispatch(getContentListIfNeeded());
        store.dispatch(getUnitsListIfNeeded());
    };
    
    componentDidMount() {
    }

    render() {  
        return (
            <section id="content" className="col-xs-12 full-height">
                <ContentList url={this.props.match.url} contentList={this.props.content.treeList} />
                <Route exact path={`${this.props.match.url}/:id`} render={(props)=>(<ContentDetail {...props} savingContent={this.props.content.savingContent} detail={this.props.content.detail} unit={this.props.content.units[this.props.content.detail.unitType]} />)} />
            </section>
        )
    }
}

let mapStateToProps = function(state) {
    return {
      content: state.content
    };
  };
  
  export default connect(mapStateToProps)(Content);