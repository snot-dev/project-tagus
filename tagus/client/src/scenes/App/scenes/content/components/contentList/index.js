import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import CollapsableList from '../../../../components/CollapsableList';
import store from '../../../../../../services/store';
import {editContent} from '../../../../../../services/content/actions';
import Panel from '../../../../components/Panel';
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
                <NavLink to={`${this.props.url}/detail/${content._id}`} activeClassName="active" className="tagus-content-link">
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>{content.name}
                </NavLink>
                <i onClick={this._onMenuButtonClick(content)} className="tagus-content-menu-button fa fa-bars"></i>
            </div>
        );
    }

    _buildContentList() {
         return (
            <ul id="tagus-content-list" className="tagus-content-list">
                {this.props.contentList && this.props.contentList.length > 0 
                ?   this.props.contentList.map((content, index) => {
                        const branch = this._createBranch(content);
                        return (
                            <li  className="tagus-content-item" key={index}>
                                {content.children && content.children.length > 0
                                ?   <CollapsableList open={true} parent={branch}>
                                        {this._childList(content)}
                                    </CollapsableList>
                                :   this._createBranch(content)
                                }
                            </li>
                        );
                    }) 
                :  null 
                }
            </ul>
        );
    };

    _childList(item) {
        return (
            <ul className="tagus-content-list row">
                { item.children.length > 0 
                ?   item.children.map((child, index) => {
                        const branch = this._createBranch(child);
                        return(
                            <li className="tagus-content-item" key={index}>
                                {child.children && child.children.length > 0
                                ?   <CollapsableList parent={branch}>
                                        {this._childList(child)}
                                    </CollapsableList>
                                :   this._createBranch(child)
                                }
                                
                            </li>
                        );
                    }) 
                :  null
                }
            </ul>
        );
    };
   
    render() {
        return (
            <Panel title="Content" className="col-xs-4 full-height">
                {this._buildContentList()}
                {this.props.editingContent
                    ? <ContentMenu savingContent={this.props.savingContent} history={this.props.history} className="col-xs-6" onCloseButton={this._onMenuButtonClick()} units={this.props.units} detail={this.props.editingContent} />
                    : null
                }
                 <Overlay show={this.props.savingContent || this.props.fetchingList}/>
            </Panel>  
        );
    };
}

export default ContentList;