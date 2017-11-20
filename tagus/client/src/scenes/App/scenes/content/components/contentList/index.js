import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './contentList.css';

class ContentList extends Component {
    _buildContentList() {
        var that = this;
         return (
            <ul id="page-list" className="list">
                {that.props.contentList && that.props.contentList.length > 0 
                ?   that.props.contentList.map((content, index) => {
                        return (
                            <li  className="page item" key={index}>
                                <Link to={"/content/" + (content._id)} activeClassName="active" className="link">
                                    <i className="fa fa-home" aria-hidden="true"></i>{content.name}
                                </Link>
                                    
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
            <ul className="child-list">
                { item.children.length > 0 
                ?   item.children.map((child, index) => {
                        return(
                            <li className="page item" key={index}>
                                <Link to={"/content/" + (child._id)}  activeClassName="active" className="link">
                                    <i className="fa fa-file" aria-hidden="true"></i>{child.name}
                                </Link>
                                {this._childList(child)}
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
            <div>
                {this._buildContentList()}
            </div>  
        );
    };
}

export default ContentList;