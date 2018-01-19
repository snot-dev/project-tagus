import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import List from '../../../../components/List';
import Panel from '../../../../components/Panel';
import ListItem from '../../../../components/ListItem';
import './bridgeList.css';

class BridgeList extends Component {
    render() {
        return (
            <Panel title="Bridges" className="col-xs-4 full-height">
                <List id="tagus-bridges-list" className="tagus-bridges-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((bridge, key) => {
                            return (
                                <ListItem key={`${bridge._id}_${key}`}>
                                    <NavLink to={`${this.props.url}/detail/${bridge._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-file`} aria-hidden="true"></i>{bridge.name}
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

export default BridgeList;