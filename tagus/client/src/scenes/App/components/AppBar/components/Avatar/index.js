import React, { Component } from 'react';
import './avatar.css';

class Avatar extends Component {
    render() {
        return (
            <section id="avatar" className="container-fluid text-center">
                <div className="hidden-xs row">
                    <div id="icon" className="col-xs-12 fa fa-user-circle-o mt-1">

                    </div>
                </div>
                <div className="row">
                    <div id="username" className="col-xs-12">
                        <p>UserName</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Avatar;