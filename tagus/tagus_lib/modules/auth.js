var LocalStrategy = require('passport-local').Strategy;
var TokenStrategy = require('passport-token').Strategy;

module.exports = {
    strategies: function(passport, UserModel, bcrypt) {
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            UserModel.findById(id, function(err, user) {
                done(err, user);
            });
        });

        passport.use('signin', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req, email, password, done) {
                process.nextTick(function() {
                    UserModel.findOne({ 'email': email }, function(err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            return done(null, user);
                        } else {

                            var newUser = new UserModel({
                                username: req.body.username,
                                email: email,
                                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                            });

                            newUser.save(function(err) {
                                if (err) {
                                    throw err;
                                }

                                return done(null, newUser);
                            });

                        }
                    });
                });
            }));

        passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
        },
        function(req, email, password, done) {
            UserModel.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);

                if (!user || !user.validPassword(password))
                    return done(null, false, {message: "User/Password incorrect!"});

                return done(null, user);
            });

        }));

        passport.use(new TokenStrategy(
            function (username, token, done) {
                UserModel.findOne({username: username}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false);
                    }

                    //TODO: Research a way to generate and verify tokens
                    if (!user.verifyToken(token)) {
                        return done(null, false);
                    }

                    return done(null, user);
                });
            }
        ));
    },
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
};
