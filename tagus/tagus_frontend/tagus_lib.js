var React = require('react');
var dateFormat = require('dateformat');
var RichTextEditor = require('react-quill');

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
    return _fields[options.type](index, options, blurHandler, tabIndex, value);
}


var _fields = {
    "text": function(index, options, blurHandler, tabIndex, value) {
        return (
            <input type="text" className="form-field" onBlur={blurHandler()} defaultValue={value} name={options.name} />
        );
    },
    "textarea": function(index, options, blurHandler, tabIndex, value) {
        return (
            <textarea className="form-field textarea" onBlur={blurHandler()} defaultValue={value}  name={options.name} ></textarea>
        );
    },
    "richText": function(index, options, blurHandler, tabIndex, value) {
        return (
            <div className="richtext-container">
                <RichTextEditor  theme="snow" onChange={blurHandler()} defaultValue={value}  name={options.name}/>
            </div>
        );
    },
    "number": function(options) {
        return (
            <input type="number" className="form-field" name={options.name} />
        );
    },
    "boolean": function(options){
        return (
            <div className="checkbox-container">
                <input type="checkbox"  name={options.name}/>
            </div>
        );

    },
    "email": function(options) {
        return (
            <input type="email" className="form-field" />
        );
    },
    "radio": function(options) {
        return (
            <div className="checkbox-container">
                {options.options.length > 0 
                ?   options.options.map(function(option, index) {
                        return(
                         <div key={index}>
                            <label><input type="radio" name={options.name} value={option.value} /> {option.name} </label><br/>
                         </div>       
                        )
                    })   
                :   null
                }
            </div>
        );
    },
    "dropdown": function(options) {
        return (
           <select className="form-field" name={options.name}>
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

module.exports = {
    loadContentTree: _loadContentTree,
    buildTabs: _buildTabs,
    renderFieldType: _renderFieldType,
    renderSettingsTab: _renderSettings
};