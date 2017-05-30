import React from 'react';
import store from '../../../store';
import UnitTab from './tabs';

const PROPTYPES =  {
    unitField: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        createdBy: React.PropTypes.string.isRequired,
        created: React.PropTypes.string,
        edited: React.PropTypes.string,
    }).isRequired
};

const DEFAULT_PROPS = {
    unit: {
        name: "",
        type: "",
        createdBy: ""
    }
};


export default class UnitFieldDetail extends React.Component {
    constructor(props) {
        super(props);

    };

    componentWillMount() {
        this._setTabs(this.props.unit.tabs);
    };

    _setTabs(tabs) {
        this.tabs.length = 0;

        for(var i = 0; i < tabs.length; i++) {
            this.tabs.push(
                <UnitTab key={i} tab={tabs[i]} />
            );
        }
    };

    render() {
        return (
            <div className="col-xs-8">
                <section className="section content-page-list">
                    <h2 className="title">{this.props.unit.name}</h2>
                    <div className="col-xs-12">
                        {this.tabs}
                    </div>  
                </section>   
            </div>
        );
    };
};

UnitFieldDetail.propTypes = PROPTYPES;
UnitFieldDetail.defaultProps = DEFAULT_PROPS;    