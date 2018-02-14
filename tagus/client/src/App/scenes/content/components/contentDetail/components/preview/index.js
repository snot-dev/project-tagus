import React, { Component } from 'react';

class Preview extends Component {
    //TODO: Change action from form
    render() {
        return (
            <div className="container-fluid">
                    <div className="row">
                        <form target='_blank' method="post" action={`http://localhost:3001/preview/${this.props.id}`} name="preview-content" className="col-xs-12">
                            <input type="hidden" name="preview" value={true} />
                            <button className="button info pull-right">Preview</button>
                        </form>
                    </div>
                </div>
        );
    }
}

export default Preview;