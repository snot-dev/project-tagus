module.exports = [{
        name: 'Home',
        alias: 'home',
        url: '/',
        createdBy: 'user',
        created: new Date(),
        edited: new Date(),
        published: true,
        publishedAt: new Date(),
        unitType: '',
        template: 'index',
        parent: '',
        isHome: true,
        content: {
            'siteName': 'Example Site',
            'anotherField': 'This is an example sentence',
            'trueOrFalse': true
        }
    },
    {
        name: 'Contacts',
        alias: 'contacts',
        url: '/contacts',
        createdBy: 'user',
        created: new Date(),
        edited: new Date(),
        published: true,
        publishedAt: new Date(),
        unitType:  '',
        template: 'index',
        parent: '',
        isHome: false,
        content: {
            'siteName': 'Example Site'
        }
    },
    {
        name: 'Emails',
        alias: 'emails',
        url: '/contacts/emails',
        createdBy: 'user',
        created: new Date(),
        edited: new Date(),
        published: true,
        publishedAt: new Date(),
        unitType: '',
        template: 'index',
        parent: '',
        isHome: false,
        content: {
            'siteName': 'Example Site'
        }
    },
    {
        name: 'About',
        alias: 'about',
        url: '/about',
        createdBy: 'user',
        created: new Date(),
        edited: new Date(),
        published: true,
        publishedAt: new Date(),
        unitType: '',
        template: 'index',
        parent: '',
        isHome: false,
        content: {
            'siteName': 'Example Site'
        }
    }
];