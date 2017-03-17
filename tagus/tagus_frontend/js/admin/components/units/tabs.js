import React from 'react';
import TabField from './tabFields';

const PROPTYPES = {
    tab: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        fields: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            alias: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
        })).isRequired
    }).isRequired
};

export default class UnitTab extends React.Component{
    constructor(props){
        super(props);

        this.fields = [];
    };
    
    componentWillMount(){
        this._setFields(this.props.tab.fields);
    };

    _setFields(fields) {
        this.fields.length = 0;
        
        for(let i = 0; i < fields.length; i++){
            this.fields.push(
                <TabField key={i} field={fields[i]}/>
            );
        }
    };

    render() {
        return (
            <section className="row unit-tab">
                <div className="col-xs-12 unit-tab-name"> 
                    {this.props.tab.name}
                </div>
                <div className="col-xs-12 unit-tab-fields">
                    {this.fields}
                </div>
            </section>
        );
    };
};

UnitTab.propTypes = PROPTYPES;