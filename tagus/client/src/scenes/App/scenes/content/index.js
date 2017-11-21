import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getContentListIfNeeded} from '../../../../services/content/actions';
import {Route} from 'react-router-dom';
import store from '../../../../services/store';
import ContentList from './components/contentList';
import ContentDetail from './components/contentDetail';
import './content.css';

class Content extends Component {
    componentWillMount() {
        store.dispatch(getContentListIfNeeded());
    };
    
    componentDidMount() {
    }

    render() {  
        return (
            <section id="content">
                <ContentList url={this.props.match.url} contentList={this.props.content.treeList} />
                <Route exact path={`${this.props.match.url}/:id`} render={(props)=>(<ContentDetail {...props} detail={this.props.content.detail} />)} />
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