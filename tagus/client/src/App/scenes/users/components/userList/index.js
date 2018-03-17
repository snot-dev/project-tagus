import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import List from '../../../../components/List';
import ListItem from '../../../../components/ListItem';
import AddLink from '../../../../components/AddLink';
import Overlay from '../../../../components/Overlay';
import CreateUserMenu from './components/createUserMenu';
import {createUser} from '../../../../services/users/actions';
import store from '../../../../services/store';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingUser: false
        };
    }

    _toggleCreateUserMenu(creating) {
        return () => {
            this.setState({creatingUser: creating})
        };
    }

    onSubmitCreateUser(values) {
        const user = values.newUser;

        store.dispatch(createUser(user));

        this.setState({creatingUser: false})
    }

    render() {
        const menu = [
            <CreateUserMenu key="createUser" show={this.state.creatingUser} onClose={this._toggleCreateUserMenu(false)} onSubmit={this.onSubmitCreateUser.bind(this)} />
        ]
        return (
            <Panel title={this.props.name} className="col-xs-4 full-height" menu={menu}>
                <List id="tagus-users-list" className="tagus-users-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((user, key) => {
                            return (
                                <ListItem key={`${user._id}_${key}`}>
                                    <NavLink to={`${this.props.url}/${user._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-user`} aria-hidden="true"></i>{user.username}
                                    </NavLink>
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
                <AddLink text="Create new User" disabled={this.props.creatingUser} onClick={this._toggleCreateUserMenu(true)} />
                <Overlay show={this.props.fetchingList || this.props.creatingUser} />
            </Panel>
        );
    }
}

export default UserList;