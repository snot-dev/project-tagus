import React from'react';
import {Link} from 'react-router';
import { translates } from '../../translates';

export default class Index extends React.Component {
    render() {
        return (
            <div id="admin">
                <nav id="admin-top-bar">
                  <div className="logo-container">
                    <img id="logo" src="assets/images/bridge2_white.png" alt="tagus" title="tagus" />
                  </div>
                </nav>
                <nav id="admin-side-bar">
                  <ul id="side-bar-navigation" >
                    <li>
                      <Link to="/content" className="block" activeClassName="active"><i className="fa fa-file" aria-hidden="true"></i>{translates.content.en}</Link>
                    </li>
                    <li>
                      <Link to="/units" className="block" activeClassName="active"><i className="fa fa-ship" aria-hidden="true"></i>{translates.units.en}</Link>
                    </li>
                                        <li>
                      <Link to="/unitfields" className="block" activeClassName="active"><i className="fa fa-anchor" aria-hidden="true"></i>{translates.unitFields.en}</Link>
                    </li>
                    <li>
                      <Link to="/editor" className="block" activeClassName="active"><i className="fa fa-laptop" aria-hidden="true"></i>{translates.editor.en}</Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block" activeClassName="active"><i className="fa fa-cogs" aria-hidden="true"></i>{translates.settings.en}</Link>
                    </li>
                  </ul>
                </nav>
                <div id="admin-main-container">
                  <div id="admin-content-container" className="container-fluid">
                    {this.props.children}
                  </div>
                </div>
            </div>
        );
    }
};
