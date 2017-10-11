module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['tagus/**/*.js', '!tagus/build/*', '!tagus/build/**/*.js'],
                dest: 'tagus/build/main.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'tagus/build/css/styles.css': 'tagus/frontend/scss/styles.scss',
                    'tagus/build/css/initializer.css': 'tagus/frontend/scss/initializer.scss'
                    
                }
            }
        },
        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: [['babelify', { presets: ["react", "es2015"] }]]
                },
                files: {
                    'tagus/build/js/main.js': 'tagus/frontend/js/admin/components/app.js',
                    'tagus/build/js/initializer.js': 'tagus/frontend/js/initializer/initializer.js'
                }
            }
        },
        watch: {
            browserify: {
                files: ['tagus/frontend/js/**/*.js', 'Gruntfile.js'],
                tasks: ['browserify:dev', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: 'tagus/**/*.js',
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: 'tagus/frontend/scss/**/*.scss',
                tasks: ['sass', 'express:dev'],
                options: {
                    spawn: false
                }
            },
            views: {
                files: 'tagus/**/*.hbs',
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            express: {
                files: ['app.js', 'Gruntfile.js', 'tagus/ routes/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {

            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        copy: {
            main: {
                files: [
                    { 
                        expand: false,
                        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], 
                        dest: 'tagus/build/css/libraries/bootstrap.min.css' 
                    },
                    { 
                        expand: false, 
                        src: ['bower_components/font-awesome/css/font-awesome.min.css'], 
                        dest: 'tagus/build/css/libraries/font-awesome.min.css' 
                    },
                    {
                         expand: true,
                        cwd: 'bower_components/font-awesome/fonts/', 
                        src: '*', dest: 'tagus/build/css/fonts' 
                    },
                    { 
                        expand: false, 
                        src: ['bower_components/font-awesome/scss/_variables.scss'], 
                        dest: 'tagus/frontend/scss/_fa-variables.scss' 
                    },
                    { 
                        expand: false, 
                        src: ['bower_components/jquery/dist/jquery.min.js'], 
                        dest: 'tagus/build/js/libraries/jquery.min.js' 
                    },
                    { 
                        expand: false, 
                        src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], 
                        dest: 'tagus/build/js/libraries/bootstrap.min.js' 
                    },
                    { 
                        expand: true, 
                        cwd: 'bower_components/font-awesome/fonts/', 
                        src: '*', dest: 'tagus/build/css/fonts' 
                    }
                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', [ /*'concat', 'sass', 'copy', 'browserify:dev', */ 'express:dev', 'watch']);
};