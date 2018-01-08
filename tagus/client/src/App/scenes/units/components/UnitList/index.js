import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Panel from '../../../../components/Panel';
import Overlay from '../../../../components/Overlay';
import List from '../../../../components/List';
import AddLink from '../../../../components/AddLink';
import ListItem from '../../../../components/ListItem';
import CreateUnitMenu from './components/CreateUnitMenu';
import './unitsList.css';

class UnitsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingUnit: false
        };
    }

    toggleCreatingUnit(state) {
        return () => {
            this.setState({
                creatingUnit: state
            });
        }
    }

    render() {
        const menu = [
            <CreateUnitMenu key="createUnit" show={this.state.creatingUnit} onClose={this.toggleCreatingUnit(false)} />
        ];

        return (
            <Panel title="Units" className="col-xs-4 full-height" menu={menu} >
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
                
                <AddLink text="Create new Unit" disabled={this.state.creatingUnit} onClick={this.toggleCreatingUnit(true)} />
                <Overlay show={this.props.fetchingList || this.props.savingDetail}/>
            </Panel>
        );
    }
}

export default UnitsList;   