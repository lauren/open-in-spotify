module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Open in Spotify JS v0.0.1 | Copyright 2013 Lauren Sperber https://github.com/lauren/open-in-spotify/blob/master/LICENSE | <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['open-in-spotify-docs.js'],
        dest: 'open-in-spotify-docs.min.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "open-in-spotify-docs.css": "open-in-spotify-docs.less"
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "open-in-spotify-docs.css": "open-in-spotify-docs.less"
        }
      }
    },
    watch: {
      js: {
        files: ['open-in-spotify-docs.js'],
        tasks: ['jshint', 'uglify'],
      },
      less: {
        files: ['*.less'],
        tasks: ['less'],
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'open-in-spotify-docs.js'],
      options: {
        laxbreak: true,
        force: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};