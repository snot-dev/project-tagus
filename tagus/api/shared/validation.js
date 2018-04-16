const SchemaObject = require('schema-object');

const email = new SchemaObject({
    email: String,
    pass: String
});

const media = new SchemaObject({
    path: String,
    dir: String, 
    root: String
});

const settings = new SchemaObject({
    email: email,
    media: media, 
    authSecretKey: String,
    mongoConnectionString: String,
    domain: String
});

