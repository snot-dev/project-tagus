var React = require('react');
var RichTextEditor = require('react-quill');
var store = require('../../../adminStore');
var actions = require('../../../adminActions');
var ReactRedux = require('react-redux');

var PageDetail = React.createClass ( {
    componentWillMount: function() {
        store.dispatch(actions.getPagesIfNeeded());
    },
    render: function() {
        console.log(this.props);
        return (
            <section className="col-xs-9 section content-page-detail">
                <div className="row">
                    <nav className="col-xs-12 tab-navigation">
                        <ul>
                            <li><a className="tab block">Content</a></li>
                            <li><a className="tab block">Settings</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-xs-12 content-container" >
                        <label className="form-label" >This is a label</label>
                        <input type="text" className="form-field" />
                        <label className="form-label" >This is a label</label>
                        <div className="checkbox-container">
                          <input type="checkbox"  />
                        </div>
                      <label className="form-label" >This is a label</label>
                      <textarea className="form-field textarea" ></textarea>
                      <label className="form-label" >This is a label</label>
                      <select className="form-field">
                        <option>1</option>
                        <option>2</option>
                      </select>
                      <label className="form-label" >This is a label</label>
                      <div className="checkbox-container">
                        <label><input type="radio" name="radio" value="1" /> 1 </label><br/>
                        <label><input type="radio" name="radio" value="2"/> 2 </label><br/>
                        <label><input type="radio" name="radio" value="3"/> 3 </label><br/>
                      </div>
                      <label className="form-label" >This is a label</label>
                      <div className="richtext-container">
                          <RichTextEditor  theme="snow"/>
                      </div>

                    <div>
                        <button className="button" onClick={this.props.getPages}>Standard</button>
                        <button className="button submit">Submit</button>
                        <button className="button add">Add</button>
                        <button className="button delete">Delete</button>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
});


var mapStateToProps = function(state) {
  return {
    pages:  state.pages,
    isFetching: false,
    received: false
  };
};

//var mapDispatchToProps = function(dispatch) {
//  return {
//    getPagesIfNeeded: function() {
//      actions.getPagesIfNeeded(dispatch);
//    }
//  };
//};

module.exports = ReactRedux.connect(mapStateToProps)(PageDetail);
