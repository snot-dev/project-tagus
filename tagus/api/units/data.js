module.exports = [{
    name: 'Home',
    tabs: [{
            name: 'Content',
            fields: [{
                    name: 'Site Name',
                    alias: 'siteName',
                    type: 'text',
                    required: true
                },
                {
                    name: 'Another Field',
                    alias: 'anotherField',
                    type: 'richText'
                },
                {
                    name: 'True or False',
                    alias: 'trueOrFalse',
                    type: 'boolean'
                },
                {
                    name: 'Email Field',
                    alias: 'emailField',
                    type: 'email',
                    required: true
                },
                {
                    name: 'Password Field',
                    alias: 'passwordField',
                    type: 'password'
                },
                {
                    name: 'Number Field',
                    alias: 'numberField',
                    type: 'number',
                    required: true
                },
                {
                    type: 'dropdown',
                    alias: 'dropdownField',
                    name: 'Dropdown Field',
                    options: [ 
                        {
                            value: 'first',
                            name: 'First'
                        }, 
                        {
                            value: 'second',
                            name: 'Second'
                        }, 
                        {
                            value: 'third',
                            name: 'Third'
                        }
                    ]
                },
                {
                    type: 'radio',
                    alias: 'radioField',
                    name: 'Radio Field',
                    required: true,
                    options: [ 
                        {
                            value: 'first',
                            name: 'First'
                        }, 
                        {
                            value: 'second',
                            name: 'Second'
                        }, 
                        {
                            value: 'third',
                            name: 'Third'
                        }
                    ]
                }
            ]
        },
        {
            name: 'Properties',
            fields: [{
                    type: 'text',
                    alias: 'prop1',
                    name: 'Prop 1'
                },
                {
                    type: 'richText',
                    alias: 'prop2',
                    name: 'Prop 2'
                },
                {
                    type: 'boolean',
                    alias: 'prop3',
                    name: 'Prop 3'
                },
                {
                    type: 'text',
                    alias: 'prop4',
                    name: 'Prop 4'
                }
            ]
        }
    ],
    createdBy: 'user',
    created: new Date(),
    edited: new Date(),
    templates: ['index']
}];