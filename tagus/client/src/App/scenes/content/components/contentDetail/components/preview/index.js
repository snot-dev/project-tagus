import React, { Component } from 'react';
import Cookies from 'universal-cookie';

class Preview extends Component {
    //TODO: Change action from form
    _onClick() {
        const cookies = new Cookies();
        cookies.set(`preview_${this.props.id}`, 'true', {path:'/', maxAge: 5});

        window.open(`http://localhost:3001/preview/${this.props.id}`, '_blank');
    }

    render() {
        return (
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <button onClick={this._onClick.bind(this)} className="button info pull-right">Preview</button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Preview;