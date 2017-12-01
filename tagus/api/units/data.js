module.exports = [
    {
        _id: "5a017a9e83dd7214c8661648",
        name: "Plain Text",
        alias: "plainText",
        templates: [
            {
                label: "master",
                value: "master"
            },
            {
                label: "about",
                value: "about"
            },
            {
                label: "services",
                value: "services"
            },
            {
                label: "contact",
                value: "contact"
            }
        ],
        edited: new Date(),
        created: new Date(),
        tabs: [
            {
                name: "Default",
                alias: "default",
                fields: [
                    {
                        name: "Title",
                        alias: "title",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Sub Title",
                        alias: "subTitle",
                        type: "text",
                        required: false
                    },
                    {
                        name: "Link",
                        alias: "link",
                        type: "text",
                        required: false
                    },
                    {
                        name: "Link Text",
                        alias: "linkText",
                        type: "text",
                        required: false
                    }
                ]
            }
        ]
    },
    {
        _id: "5a017b9883dd7214c866164a",
        name: "Icon",
        alias: "icon",
        templates: [ 
            {
                label: "master",
                value: "master"
            },
            {
                label: "services",
                value: "services"
            },
            {
                label: "contact",
                value: "contact"
            }
        ],
        edited: new Date(),
        created: new Date(),
        tabs: [
            {
                name: "Default",
                alias: "default",
                fields: [
                    {
                        name: "Icon",
                        alias: "icon",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Text",
                        alias: "text",
                        type: "text",
                        required: true
                    },
                    {
                        name: "Sub Text",
                        alias: "subText",
                        type: "text",
                        required: false
                    }
                ]
            }
        ]
    }
]