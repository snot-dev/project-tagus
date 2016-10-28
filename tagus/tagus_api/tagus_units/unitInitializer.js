module.exports = [{
    name: "Home",
    tabs: [{
            name: "Content",
            unitFields: [{
                    name: "Site Name",
                    alias: "siteName",
                    type: "text"
                },
                {
                    name: "Another Field",
                    alias: "anotherField",
                    type: "richText"
                },
                {
                    name: "True or False",
                    alias: "trueOrFalse",
                    type: "boolean"
                },
                {
                    name: "Email Field",
                    alias: "emailField",
                    type: "email"
                },
                {
                    name: "Password Field",
                    alias: "passwordField",
                    type: "password"
                },
                {
                    name: "Number Field",
                    alias: "numberField",
                    type: "number"
                },
                {
                    type: "dropdown",
                    alias: "dropdownField",
                    name: "Dropdown Field",
                    options: [ 
                        {
                            value: "first",
                            name: "First"
                        }, 
                        {
                            value: "second",
                            name: "Second"
                        }, 
                        {
                            value: "third",
                            name: "Third"
                        }
                    ]
                },
                {
                    type: "radio",
                    alias: "radioField",
                    name: "Radio Field",
                    options: [ 
                        {
                            value: "first",
                            name: "First"
                        }, 
                        {
                            value: "second",
                            name: "Second"
                        }, 
                        {
                            value: "third",
                            name: "Third"
                        }
                    ]
                }
            ]
        },
        {
            name: "Properties",
            unitFields: [{
                    type: "text",
                    alias: "prop1",
                    name: "Prop 1"
                },
                {
                    type: "richText",
                    alias: "prop2",
                    name: "Prop 2"
                },
                {
                    type: "boolean",
                    alias: "prop3",
                    name: "Prop 3"
                },
                {
                    type: "text",
                    alias: "prop4",
                    name: "Prop 4"
                }
            ]
        }
    ],
    createdBy: "user",
    created: new Date(),
    edited: new Date(),
    templates: ["index"]
}];