/**
 * Created by GoncaloAssuncao on 21/03/2016.
 */
/**
 * Created by Gonçalo Assunção on 11/03/2016.
 */


module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist: {
        src: ['app/**/*.js', '!app/a_build/*', '!app/a_build/**/*.js'],
        dest: 'app/a_build/main.js'
      }
    },
    sass: {
      dist: {
        files: {
          'app/a_build/css/main.css': 'app/a_frontend/scss/main.scss'
        }
      }
    },
    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'app/a_build/js/main.js': 'app/a_frontend/components/app.jsx'
        }
      }
    },
    watch: {
      browserify: {
        files: ['app/**/*.jsx','app/**/*.js', 'Gruntfile.js'],
        tasks: ['browserify:dev', 'express:dev'],
        options: {
          spawn: false
        }
      },
      js: {
        files: 'app/**/*.js',
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: 'app/a_frontend/scss/*.scss',
        tasks: ['sass', 'express:dev'],
        options: {
          spawn: false
        }
      },
      views: {
        files: 'app/**/*.hbs',
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      express: {
        files: ['app.js', 'Gruntfile.js', 'app/a_routes/*.js'],
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
          {expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/a_build/bootstrap.min.css'}
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
  grunt.registerTask('default', [/*'concat',*/ 'sass','copy', 'browserify:dev', 'express:dev', 'watch']);
};
