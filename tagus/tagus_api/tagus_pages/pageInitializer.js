module.exports = [{
        name: "Home",
        url: "/",
        createdBy: "user",
        created: new Date(),
        edited: new Date(),
        published: new Date(),
        unitType: {
            id: ""
        },
        template: "index",
        parent: "",
        isHome: true,
        content: {
            'siteName': "Example Site",
            'anotherField': "This is an example sentence",
            'trueOrFalse': true
        }
    },
    {
        name: "Contacts",
        url: "/contacts",
        createdBy: "user",
        created: new Date(),
        edited: new Date(),
        published: new Date(),
        unitType: {
            id: ''
        },
        template: "index",
        parent: "",
        isHome: false,
        content: {
            'siteName': "Example Site"
        }
    },
    {
        name: "Emails",
        url: "/contacts/emails",
        createdBy: "user",
        created: new Date(),
        edited: new Date(),
        published: new Date(),
        unitType: {
            id: '',
        },
        template: "index",
        parent: "",
        isHome: false,
        content: {
            'siteName': "Example Site"
        }
    },
    {
        name: "About",
        url: "/about",
        createdBy: "user",
        created: new Date(),
        edited: new Date(),
        published: new Date(),
        unitType: {
            id: "",
        },
        template: "index",
        parent: "",
        isHome: false,
        content: {
            'siteName': "Example Site"
        }
    }
];