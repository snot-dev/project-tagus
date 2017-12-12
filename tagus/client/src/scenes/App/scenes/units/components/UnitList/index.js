import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import List from '../../../../components/List';
import ListItem from '../../../../components/ListItem';
import './unitsList.css';

class UnitsList extends Component {
    _displayUnitsList() {
        return (
                <List id="tagus-units-list" className="tagus-units-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((unit, key) => {
                            return (
                                <ListItem key={`${unit._id}_${key}`}>
                                    <NavLink to={`${this.props.url}/detail/${unit._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-file`} aria-hidden="true"></i>{unit.name}
                                    </NavLink>
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
        )
       
    }


    render() {
        console.warn(this.props);
        return (
            <Panel title="Units" className="col-xs-4 full-height">
                {this._displayUnitsList()}
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsList;   