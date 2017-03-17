import React from 'react';
import store from '../../../store';
import UnitTab from './tabs';

const PROPTYPES =  {
    unit: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            fields: React.PropTypes.arrayOf(React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                alias: React.PropTypes.string.isRequired,
                type: React.PropTypes.string.isRequired,
            })).isRequired
        })).isRequired,
        templates: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    }).isRequired
};

const DEFAULT_PROPS = {
    unit: {
        name: "",
        tabs: [{name:"", fields: [{name: "", alias: "", type: "text"}]}],
        templates: [""]
    }
};


export default class UnitDetail extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [];
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

UnitDetail.propTypes = PROPTYPES;
UnitDetail.defaultProps = DEFAULT_PROPS;    