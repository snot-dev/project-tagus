var React = require('react');

var Dashboard = React.createClass( {
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            hello world Dashboard!
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;