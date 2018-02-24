import React, { Component } from 'react';
import {connect} from 'react-redux';
import Panel from '../../components/Panel';

class Profile extends Component {

    render() {
        console.warn(this.props);
        return (
            <section id="profile" className="full-height col-xs-12">
                <Panel className="col-xs-8" title="Profile"> 
                    this is the user profile!
                </Panel>
            </section> 
        );
    }
}


const mapStateToProps = state => {
    return {
      profile: state.profile
    };
  };
  
export default connect(mapStateToProps)(Profile);