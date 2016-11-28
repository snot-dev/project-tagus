import React from 'react';
import Link from 'react-router';
import store from '../../adminStore';
import {pageActions} from '../../actions/pagesActions';
import {connect} from 'react-redux';

class Content extends React.Component {
    componentWillMount() {
       store.dispatch(pageActions.getPageListIfNeeded());
    };

    _dispatchPageDetail(id) {
        return () => {
            store.dispatch(pageActions.getPageDetailIfNeeded(id));
        }
     };

    _buildPageList() {
        var that = this;
         return (
            <ul id="page-list" className="list">
                {that.props.pages.list && that.props.pages.list.length > 0 
                ?   that.props.pages.list.map(function(page, index) {
                        return (
                            <li  className="page item" key={index}>
                                <Link to={"/content/" + (page._id)} onClick={that._dispatchPageDetail(page._id)} activeClassName="active" className="link"><i className="fa fa-home" aria-hidden="true"></i>{page.name}</Link>
                                    {page.children.length > 0 ?
                                        that._childList(page)
                                    : null
                                    }
                            </li>
                        );
                    }) 
                :  null 
                }
            </ul>
        );
    };

    _childList(item) {
        var that = this;
        return (
            <ul className="child-list">
                { item.children.length > 0 
                ?   item.children.map(function(child, index) {
                        return(
                            <li className="page item" key={index}>
                                <Link to={"/content/" + (child._id)} onClick={that._dispatchPageDetail(child._id)} activeClassName="active" className="link"><i className="fa fa-file" aria-hidden="true"></i>{child.name}</Link>
                                {that._childList(child)}
                            </li>
                        );
                    }) 
                :  null
                }
            </ul>
        );
    };

    render() {
        return (
            <div id="admin-content-container" className="container-fluid">
                <div className="row">
                    <div className="col-xs-3">
                        <section className="section content-page-list">
                            <h2 className="title">Content</h2>
                            {this.props.pages.fetchingPageList ? 
                                <div className="loader"></div>
                            :  
                                <div>
                                    {this._buildPageList()}
                                </div>
                            }
                        </section>     
                        
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    };
};

let mapStateToProps = function(state) {
  return {
    pages:  state.pages
  };
};

export default connect(mapStateToProps)(Content);
