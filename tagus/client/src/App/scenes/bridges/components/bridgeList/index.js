import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import List from '../../../../components/List';
import Panel from '../../../../components/Panel';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import AddLink from '../../../../components/AddLink';
import CreateBridgeMenu from './components/createBridgeMenu';
import Overlay from '../../../../components/Overlay';
import store from '../../../../services/store';
import {createBridge} from '../../../../services/bridges/actions';
import './bridgeList.css';

class BridgeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingBridge: null,
            deleteMode: false
        };
    }

    toggleDeleteModal(show) {
        return() => {
            this.setState({
                deleteMode: show
            });
        };
    }

    toggleCreatingBridge(state) {
        return () => {
            this.setState({
                creatingBridge: state
            });
        }
    }

    _deleteBridge() {
        this.setState({
            deleteMode: false
        });
    }

    onSubmitCreatingBridge(values) {
        this.setState({
            creatingBridge: false
        });

        this.props.history.push('/bridges');
        store.dispatch(createBridge(values.newBridge));
    }

    render() {
        const menu = [
            <CreateBridgeMenu key="createBridge" units={this.props.units}  show={!!this.state.creatingBridge} onClose={this.toggleCreatingBridge(false)} onSubmit={this.onSubmitCreatingBridge.bind(this)} />
        ];

        return (
            <Panel title="Bridges" className="col-xs-4 full-height" menu={menu}>
                <List id="tagus-bridges-list" className="tagus-bridges-list">
                    {this.props.list && this.props.list.length > 0
                    ?   this.props.list.map((bridge, key) => {
                            return (
                                <ListItem key={`${bridge._id}_${key}`} className="tagus-bridges-list-item">
                                    <NavLink to={`${this.props.url}/detail/${bridge._id}`} activeClassName="active" className="tagus-list-item-link">
                                        <i className={`fa fa-file`} aria-hidden="true"></i>{bridge.name}
                                        <div onClick={this.toggleDeleteModal(bridge._id)} className="tagus-bridges-list-delete">
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </div>
                                    </NavLink>
                                </ListItem>
                            );
                        })
                    :   null}
                </List>
                <AddLink text="Create new Bridge" disabled={this.state.creatingBridge} onClick={this.toggleCreatingBridge(true)} />
                <Overlay show={this.props.savingDetail || this.props.fetchingList || this.props.fetchingDetail}/>
                <Modal show={!!this.state.deleteMode} title="Warning!" body={"Are you sure you want to DELETE PERMANENTLY this bridge?"} closeButton={{onClick: this.toggleDeleteModal(false), text: "Cancel"}} confirmButton={{onClick:this._deleteBridge.bind(this), text: "Yes, I'm sure!"}} />
            </Panel>
        );
    }
}

export default BridgeList;