import React, { Component } from 'react';
import {connect} from 'react-redux';
import Panel from '../../components/Panel';
import Overlay from '../../components/Overlay';
import ProfileForm from './components/profileForm';

class Profile extends Component {
    render() {
        return (
            <section id="profile" className="full-height col-xs-12">
                <Panel className="col-xs-8" title="Profile"> 
                    <ProfileForm user={this.props.profile.user} />
                    <Overlay show={this.props.profile.savingUser} />
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