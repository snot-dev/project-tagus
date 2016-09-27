var React = require('react');
var Link = require('react-router').Link;
var store = require('../../adminStore');
var actions = require('../../adminActions');
var ReactRedux = require('react-redux');

var Content = React.createClass( {
    componentWillMount: function() {
       store.dispatch(actions.getPagesIfNeeded());
    },
    _buildPageList: function() {
        var that = this;
         return (
            <ul id="page-list" className="list">
                {that.props.pages.list && that.props.pages.list.length > 0 
                ?   that.props.pages.list.map(function(page, index) {
                        return (
                            <li className="page item" key={index}>
                                <a className="link"><i className="fa fa-file" aria-hidden="true"></i>{page.name}</a>
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
    },
    _childList: function(item) {
        var that = this;
        return (
            <ul className="child-list">
                { item.children.length > 0 
                ?   item.children.map(function(child, index) {
                        return(
                            <li className="page item" key={index}>
                                <a className="link"><i className="fa fa-file" aria-hidden="true"></i>{child.name}</a>
                                {that._childList(child)}
                            </li>
                        );
                    }) 
                :  null
                }
            </ul>
        );
    }, 
    render: function() {
        return (
        <div id="admin-content-container" className="container-fluid">
            <div className="row">
                <div className="col-xs-3">
                    <section className="section content-page-list">
                        <h2 className="title">Content</h2>
                            {this._buildPageList()}
                    </section>
                </div>
                {this.props.children}
            </div>
        </div>
        );
    }
});

var mapStateToProps = function(state) {
  return {
    pages:  state.pages,
    isFetching: false,
    received: false
  };
};


module.exports = ReactRedux.connect(mapStateToProps)(Content);
