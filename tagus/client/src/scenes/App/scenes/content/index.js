import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getContentListIfNeeded, getUnitsListIfNeeded} from '../../../../services/content/actions';
import {Route, Redirect} from 'react-router-dom';
import store from '../../../../services/store';
import ContentList from './components/contentList';
import ContentDetail from './components/contentDetail';
import CreateContent from './components/createContent';
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
                <ContentList url={this.props.match.url} contentList={this.props.content.treeList} editingContent={this.props.content.editingContent} />
                <Route exact path={`${this.props.match.url}/create`} render={(props)=>( 
                    this.props.content.editingContent 
                    ?   <CreateContent {...props} savingContent={this.props.content.savingContent} units={this.props.content.units} parent={this.props.content.editingContent}/>
                    :   <Redirect to="/content"/>)} 
                />
                <Route exact={false}  path={`${this.props.match.url}/detail/:id`} render={(props)=>(<ContentDetail {...props} savingContent={this.props.content.savingContent} detail={this.props.content.detail} unit={this.props.content.units[this.props.content.detail.unitType]} />)} />
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