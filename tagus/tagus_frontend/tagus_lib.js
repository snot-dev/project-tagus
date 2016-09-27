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


var _renderFieldType = function(type) {
    return _fields(type);
}


var _fields = {
    "text": function(options) {
        return (
            <input type="text" className="form-field" name={options.name} />
        );
    },
    "textarea": function(options) {
        return (
            <textarea className="form-field textarea" name={options.name} ></textarea>
        );
    },
    "richText": function(options) {
        return (
            <div className="richtext-container">
                <RichTextEditor  theme="snow" name={options.name}/>
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

module.exports = {
    loadContentTree: _loadContentTree,
    renderFieldType: _renderFieldType
};