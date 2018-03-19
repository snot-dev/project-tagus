import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import UserList from './components/userList';
import UserDetail from './components/userDetail';
import {getUsersIfNeeded} from '../../services/users/actions';
import store from '../../services/store';

class Users extends Component {
    componentDidMount() {
        store.dispatch(getUsersIfNeeded());
    }

    render() {
        return (
            <section id="users" className="full-height col-xs-12">
                <UserList name={this.props.name} url={this.props.match.url} list={this.props.users.list} fetchingList={this.props.users.fetchingList} creatingUser={this.props.users.creatingUser} deletingUser={this.props.users.deletingUser} />
                <Route exact={false}  path={`${this.props.match.url}/:id`} render={(props)=>(<UserDetail {...props} savingContent={this.props.users.savingDetail} detail={this.props.users.detail} />)} />
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
      users: state.users,
      auth: state.auth
    };
  };
  
  export default connect(mapStateToProps)(Users);