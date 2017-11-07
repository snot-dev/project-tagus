module.exports = [
    {
        _id: "5a017a9e83dd7214c8661648",
        name: "Plain Text",
        alias: "plainText",
        templates: [
            "master",
            "home",
            "standard"
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
                        required: true
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
        _id: "5a017b0983dd7214c8661649",
        name: "Banner",
        alias: "banner",
        templates: [
            "master",
            "home"
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
                        required: true
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
                    },
                    {
                        name: "Banner Image",
                        alias: "bannerImg",
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
            "master",
            "icon"
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
                    }
                ]
            }
        ]
    }
]