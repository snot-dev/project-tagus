var React = require('react');
var Link = require('react-router').Link;
var store = require('../../adminStore');
var actions = require('../../adminActions');
var ReactRedux = require('react-redux');

var Content = React.createClass( {
    componentWillMount: function() {
       store.dispatch(actions.getPagesIfNeeded());
    },  
    _buildChildTree: function _buildChild(item, index) {
       
    },
    render: function() {
        var that = this;
        var buildTree = function build(item, index) {
            return(
                <li className="page item" key={index}>
                   hello
                </li>
            );
        };
        return (
        <div id="admin-content-container" className="container-fluid">
            <div className="row">
                <div className="col-xs-3">
                    <section className="section content-page-list">
                        <h2 className="title">Content</h2>
                        {this.props.pages.list && this.props.pages.list.length > 0 ? 
                            <ul id="page-list" className="list">
                            {this.props.pages.list.map(function(item, index) {
                                {buildTree(item, index)}
                            })}   
                            </ul>
                        :null}
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
