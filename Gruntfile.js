module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['tagus/**/*.js', '!tagus/tagus_build/*', '!tagus/tagus_build/**/*.js'],
                dest: 'tagus/tagus_build/main.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'tagus/tagus_build/css/styles.css': 'tagus/tagus_frontend/scss/styles.scss',
                    'tagus/tagus_build/css/initializer.css': 'tagus/tagus_frontend/scss/initializer.scss'
                    
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
                    'tagus/tagus_build/js/main.js': 'tagus/tagus_frontend/js/components/app.js',
                    'tagus/tagus_build/js/initializer.js': 'tagus/tagus_frontend/js/initializer/initializer.js'
                }
            }
        },
        watch: {
            browserify: {
                files: ['tagus/tagus_frontend/js/**/*.js', 'Gruntfile.js'],
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
                files: 'tagus/tagus_frontend/scss/**/*.scss',
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
                files: ['app.js', 'Gruntfile.js', 'tagus/tagus_routes/*.js'],
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
                    { expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'tagus/tagus_build/css/libraries/bootstrap.min.css' },
                    { expand: false, src: ['bower_components/font-awesome/css/font-awesome.min.css'], dest: 'tagus/tagus_build/css/libraries/font-awesome.min.css' },
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: '*', dest: 'tagus/tagus_build/css/fonts' },
                    { expand: false, src: ['bower_components/font-awesome/scss/_variables.scss'], dest: 'tagus/tagus_frontend/scss/_fa-variables.scss' },
                    { expand: false, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'tagus/tagus_build/js/libraries/jquery.min.js' },
                    { expand: false, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'tagus/tagus_build/js/libraries/bootstrap.min.js' },
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: '*', dest: 'tagus/tagus_build/css/fonts' }
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
    grunt.registerTask('default', [ /*'concat',*/ 'sass', 'copy', 'browserify:dev', 'express:dev', 'watch']);
};