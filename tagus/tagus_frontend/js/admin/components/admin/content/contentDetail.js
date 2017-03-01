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

    componentWillMount() {
        store.dispatch(getContentDetailIfNeeded(this.props.params.id));
    };

    _onSubmit(formState) {

    };

    _onError() {
        console.log("ERRRORRRR");
    }

    render() {
        console.warn(this.props);
        return (
            <div className="col-xs-9">
                <section id="content-page-detail" className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Form tabs={this.props.content.unit.tabs}  onError={this._onError.bind(this)} onSubmit={this._onSubmit.bind(this)} settings={this._settings} />
                        </div>
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