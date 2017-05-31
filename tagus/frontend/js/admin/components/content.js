import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {getContentListIfNeeded, getContentDetailIfNeeded} from '../actions/contentActions';
import {connect} from 'react-redux';
import ContentList from './content/list';

class Content extends React.Component {
    componentWillMount() {
        store.dispatch(getContentListIfNeeded());
        
        if(this.props.params.id) {
            store.dispatch(getContentDetailIfNeeded(this.props.params.id));
        }
    };

    _getContentDetail(id) {
        return () =>{
            store.dispatch(getContentDetailIfNeeded(id));
        };
    };

    render() {
        return (
            <div className="row">
                <ContentList contentList={this.props.content.treeList} getDetail={this._getContentDetail} />
                {this.props.children ?  React.cloneElement(this.props.children, {detail: this.props.content.detail, unit: this.props.content.unit}) : null}
            </div>
        );
    };
};

let mapStateToProps = function(state) {
  return {
    content:  state.content,
    showLoader: state.content.fetchingDetail || state.content.savingDetail
  };
};

export default connect(mapStateToProps)(Content);