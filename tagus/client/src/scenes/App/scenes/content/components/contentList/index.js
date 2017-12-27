import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import CollapsableList from '../../../../components/CollapsableList';
import store from '../../../../../../services/store';
import {editContent} from '../../../../../../services/content/actions';
import Panel from '../../../../components/Panel';
import List from '../../../../components/List';
import ListItem from '../../../../components/ListItem';
import Overlay from '../../../../components/Overlay';
import ContentMenu from './components/contentMenu';
import './contentList.css';

class ContentList extends Component {
    _onMenuButtonClick(content) {
        return () => {
            if(!this.props.editingContent || !content || this.props.editingContent._id !== content._id ) {
                store.dispatch(editContent(content));
            }
        }
    }

    _createBranch(content) {
        const icon = content.parent ? "file" : "home";
        return (
            <div className="tagus-content-link-container">
                <NavLink to={`${this.props.url}/detail/${content._id}`} activeClassName="active" className="tagus-list-item-link">
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>{content.name}
                </NavLink>
                <i onClick={this._onMenuButtonClick(content)} className="tagus-content-menu-button fa fa-bars"></i>
            </div>
        );
    }

    _buildContentList() {
         return (
            <List id="tagus-content-list" className="tagus-content-list">
                {this.props.contentList && this.props.contentList.length > 0 
                ?   this.props.contentList.map((content, index) => {
                        const branch = this._createBranch(content);
                        return (
                            <ListItem  className="tagus-content-item" key={index}>
                                {branch}
                                {this._childList(content)}
                            </ListItem>
                        );
                    }) 
                :  null 
                }
            </List>
        );
    };

    _childList(item) {
        return (
            <List className="tagus-content-list">
                { item.children.length > 0 
                ?   item.children.map((child, index) => {
                        const branch = this._createBranch(child);
                        return(
                            <ListItem className="tagus-content-item" key={index}>
                                {child.children && child.children.length > 0
                                ?   <CollapsableList parent={branch}>
                                        {this._childList(child)}
                                    </CollapsableList>
                                :   this._createBranch(child)
                                }
                                
                            </ListItem>
                        );
                    }) 
                :  null
                }
            </List>
        );
    };
   
    render() {
        const menu = this.props.editingContent
        ? <ContentMenu savingContent={this.props.savingContent} history={this.props.history} className="col-xs-6" onCloseButton={this._onMenuButtonClick()} units={this.props.units} detail={this.props.editingContent} />
        : null;

        return (
            <Panel title="Content" className="col-xs-4 full-height" menu={menu}>
                {this._buildContentList()}
                 <Overlay show={this.props.savingContent || this.props.fetchingList}/>
            </Panel>  
        );
    };
}

export default ContentList;