var React = require('react');
var dateFormat = require('dateformat');
var RichTextEditor = require('react-quill');
var _ = require('underscore');

var _loadContentTree = function(list) {
    if (!list) {
        //error
    }

    var lookoutList = {},
        treeList = [];

    list.forEach(function(item) {
        lookoutList[item._id] = item;
        item.children = [];
    });

    list.forEach(function(item) {
        if (item.parent) {
            lookoutList[item.parent].children.push(item);
        } else {
            treeList.push(item);
        }
    });

    return treeList;
};



var _buildTabs = function(tabList) {
    var tabs = [];
    
    tabList.forEach(function(tab) {
        tabs.push(tab.name);
    });

    tabs.push("Settings");

    return tabs;
};

var _renderFieldType = function(index, options, blurHandler, tabIndex, value) {
    return _fields(index, options, blurHandler, tabIndex, value)[options.type]();
}


var _fields = function(index, options, blurHandler, tabIndex, value){
    return {
        "text": function() {
            return (
                <input type="text" className="form-field" onBlur={blurHandler()} defaultValue={value} name={options.alias} />
            );
        },
        "textarea": function() {
            return (
                <textarea className="form-field textarea" onBlur={blurHandler()} defaultValue={value}  name={options.alias} ></textarea>
            );
        },
        "richText": function() {
            return (
                <div className="richtext-container">
                    <RichTextEditor  theme="snow" onChange={blurHandler()} defaultValue={value}  name={options.alias}/>
                </div>
            );
        },
        "number": function() {
            return (
                <input type="number" className="form-field" name={options.alias} />
            );
        },
        "boolean": function(){
            console.log("called!");
            console.log(value);
            return (
                <div className="checkbox-container">
                    <input type="checkbox" onChange={blurHandler()} name={options.alias} selected={value} />
                </div>
            );

        },
        "email": function() {
            return (
                <input type="email" className="form-field" />
            );
        },
        "radio": function() {
            return (
                <div className="checkbox-container">
                    {options.options.length > 0 
                    ?   options.options.map(function(option, index) {
                            return(
                            <div key={index}>
                                <label><input type="radio" name={options.alias} value={option.value} /> {option.name} </label><br/>
                            </div>       
                            )
                        })   
                    :   null
                    }
                </div>
            );
        },
        "dropdown": function() {
            return (
            <select className="form-field" name={options.alias}>
                {options.options.length > 0 
                ?   options.options.map(function(option, index) {
                        return(
                            <option value={option.value} key={index}>{options.name}</option>      
                        )
                    })   
                :   null
                }
            </select>  
            );
        }
    }
};

var _renderSettings = function(page, blurHandler) {
    return (
        <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" onBlur={blurHandler()} className="form-field" defaultValue={page.name} />
            <label htmlFor="url" className="form-label">Url</label>
            <input type="text" name="url" onBlur={blurHandler()} className="form-field" defaultValue={page.url} />
            <label className="form-label">Unit Type</label>
            <p>{page.unitType.name}</p>
            <label className="form-label">Created</label>
            <p>{dateFormat(page.created, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
            <label className="form-label">Created By</label>
            <p>{page.createdBy}</p>
            <label className="form-label">Edited</label>
            <p>{dateFormat(page.edited, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
            

        </div>
    );
}

var _createTabInPage = function(page, tab, index) {
        page.unitType.tabs.splice(index, 0, tab);
};
var _createFieldInPage = function(tab, field) {
        var newField = _.extend({}, field);
        newField.value = null;
        tab.unitFields.push(newField);
};

module.exports = {
    loadContentTree: _loadContentTree,
    buildTabs: _buildTabs,
    renderFieldType: _renderFieldType,
    renderSettingsTab: _renderSettings,
    createTabInPage: _createTabInPage,
    createFieldInPage: _createFieldInPage
};