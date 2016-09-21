var React = require('react');
var Link = require('react-router').Link;

var Content = React.createClass( {
  render: function() {
    return (
      <div id="admin-content-container" className="container-fluid">
        <div className="row">
            <div className="col-xs-3">
                <section className="section content-page-list">
                    <h2 className="title">Content</h2>
                    <ul id="page-list" className="list">
                        <li className="page item"><Link to="/content/id" className="link"><i className="fa fa-home" aria-hidden="true"></i>Home <i className="fa fa-list pull-right options" aria-hidden="true"></i></Link></li>
                        <li className="page item"><a className="active link"><i className="fa fa-file" aria-hidden="true"></i>Contacts <i className="fa fa-list pull-right options" aria-hidden="true"></i></a></li>
                        <li className="page item">
                            <a className="link"><i className="fa fa-file" aria-hidden="true"></i>News <i className="fa fa-list pull-right options" aria-hidden="true"></i></a>
                            <ul className="child-list">
                                <li className="page item"><a className="link"><i className="fa fa-file" aria-hidden="true"></i>One <i className="fa fa-list pull-right options" aria-hidden="true"></i></a></li>
                                <li className="page item"><a className="link"><i className="fa fa-file" aria-hidden="true"></i>Two <i className="fa fa-list pull-right options" aria-hidden="true"></i></a></li>
                                <li className="page item">
                                    <a className="link"><i className="fa fa-file" aria-hidden="true"></i>Three <i className="fa fa-list pull-right options" aria-hidden="true"></i></a>
                                    <ul className="child-list">
                                        <li className="page item"><a className="link"><i className="fa fa-file" aria-hidden="true"></i>Uno <i className="fa fa-list pull-right options" aria-hidden="true"></i></a></li>
                                        <li className="page item"><a className="link"><i className="fa fa-file" aria-hidden="true"></i>Dos <i className="fa fa-list pull-right options" aria-hidden="true"></i></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>

            {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Content;
