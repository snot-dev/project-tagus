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
                    name: "Another Field",
                    alias: "anotherField",
                    type: "text"
                }
            ]
        },
        {
            "unitFields": [{
                    "type": "text",
                    "alias": "prop1",
                    "name": "Prop 1"
                },
                {
                    "type": "richText",
                    "alias": "prop2",
                    "name": "Prop 2"
                },
                {
                    "type": "boolean",
                    "alias": "prop3",
                    "name": "Prop 3"
                },
                {
                    "type": "text",
                    "alias": "prop4",
                    "name": "Prop 4"
                }
            ],
            "name": "Properties"
        }
    ],
    createdBy: "user",
    created: new Date(),
    edited: new Date(),
    templates: ["index"]
}];