module.exports = [
                    {
                        name: "Home",
                        url: "/",
                        createdBy: "user",
                        created: new Date(),
                        edited: new Date(),
                        published: new Date(),
                        unitType: {
                            name: "Home",
                            tabs: [
                                {
                                    name: "Content",
                                    unitFields: [{
                                        name: "Site Name",
                                        alias: "siteName",
                                        type: "text",
                                        value: "Example Site"
                                    }]
                                }
                            ]
                        },
                        template: "index",
                        parent: "",
                        isHome: true
                    },
                    {
                        name: "Contacts",
                        url: "/contacts",
                        createdBy: "user",
                        created: new Date(),
                        edited: new Date(),
                        published: new Date(),
                        unitType: {
                            name: "Home",
                            unitFields: [{
                                name: "Site Name",
                                alias: "siteName",
                                type: "text",
                                value: "Example Site"
                            }]
                        },
                        template: "index",
                        parent: "",
                        isHome: false
                    },
                    {
                        name: "Emails",
                        url: "/contacts/emails",
                        createdBy: "user",
                        created: new Date(),
                        edited: new Date(),
                        published: new Date(),
                        unitType: {
                            name: "Home",
                            unitFields: [{
                                name: "Site Name",
                                alias: "siteName",
                                type: "text",
                                value: "Example Site"
                            }]
                        },
                        template: "index",
                        parent: "",
                        isHome: false
                    },
                    {
                        name: "About",
                        url: "/about",
                        createdBy: "user",
                        created: new Date(),
                        edited: new Date(),
                        published: new Date(),
                        unitType: {
                            name: "Home",
                            unitFields: [{
                                name: "Site Name",
                                alias: "siteName",
                                type: "text",
                                value: "Example Site"
                            }]
                        },
                        template: "index",
                        parent: "",
                        isHome: false
                    }
                ];
