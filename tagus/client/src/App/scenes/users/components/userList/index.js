import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import List from '../../../../components/List';
import ListItem from '../../../../components/ListItem';

class UserList extends Component {
    render() {
        return (
            <Panel title={this.props.name} className="col-xs-4 full-height" >
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
            </Panel>
        );
    }
}

export default UserList;