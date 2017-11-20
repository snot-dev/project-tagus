import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getContentListIfNeeded, getContentDetailIfNeeded} from '../../../../services/content/actions';
import {Link} from 'react-router-dom';
import Panel from '../../components/Panel';
import store from '../../../../services/store';
import ContentList from './components/contentList';
import './content.css';

class Content extends Component {
    componentWillMount() {
        store.dispatch(getContentListIfNeeded());
        
        // if(this.props.params.id) {
        //     store.dispatch(getContentDetailIfNeeded(this.props.params.id));
        // }
    };

    render() {
        console.warn(this.props);
        return (
            <Panel header="Content" className="col-xs-4">
               <ContentList contentList={this.props.content.treeList} />
            </Panel>
        )
    }
}

let mapStateToProps = function(state) {
    return {
      content: state.content
    };
  };
  
  export default connect(mapStateToProps)(Content);