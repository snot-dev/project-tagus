import React from 'react';
import {connect} from 'react-redux';
import store from '../../../../store';
import {getContentDetailIfNeeded} from '../../../actions/contentActions';
import Form from '../../../../forms/components/form';

class PageDetail extends React.Component {
    constructor(props) {
        super(props);
        this._settings = {
            validation: {
                validate: true,
                onError: 'error'
            },
            enableTabs: true
        }

    }
    render() {

        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                        <div className="col-xs-12">Hello world!</div>
                    </div>
                </section>
            </div>
        )
    };
};

var mapStateToProps = function(state) {
  return {
    content:  state.content,
    showLoader: state.content.fetchingPageDetail || state.content.savingPageDetail
  };
};


export default connect(mapStateToProps)(PageDetail);