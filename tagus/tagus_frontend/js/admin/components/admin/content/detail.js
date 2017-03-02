import React from 'react';
import {getContentDetailIfNeeded} from '../../../actions/contentActions';
import Field from '../../../../forms/components/field';

export default class ContentDetail extends React.Component {
    _onSubmit(formState) {

    };

    _onError() {
        console.log("ERRRORRRR");
    }

    render() {
        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            {this.props.detail.name}
                        </div>
                    </div>
                </section>
            </div>
        )
    };
};
