module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Open in Spotify Docs JS v<%= pkg.version %> | Copyright 2013 Lauren Sperber https://github.com/lauren/open-in-spotify/blob/master/LICENSE | <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.min.js'
      }
    },
    less: {
      production: {
        options: {
          compress: true
        },
        files: {
          "<%= pkg.name %>.css": "<%= pkg.name %>.less"
        }
      }
    },
    watch: {
      js: {
        files: ['<%= pkg.name %>.js'],
        tasks: ['jshint', 'uglify'],
      },
      less: {
        files: ['*.less'],
        tasks: ['less'],
      }
    },
    jshint: {
      all: ['Gruntfile.js', '<%= pkg.name %>.js'],
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