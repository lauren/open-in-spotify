module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Open in Spotify JS v0.0.1 | Copyright 2013 Lauren Sperber https://github.com/lauren/pick-a-color/blob/master/LICENSE | <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/selectors.js', 'src/spotify-querier.js', 'src/render.js', 'src/save-to-spotify.js', 'src/shims.js'],
        dest: 'build/open-in-spotify.min.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true
        },
        files: {
          "build/save-to-spotify.css": "src/save-to-spotify.less"
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "build/save-to-spotify.css": "src/save-to-spotify.less"
        }
      }
    },
    watch: {
      js: {
        files: ['src/*.js'],
        tasks: ['uglify'],
      },
      less: {
        files: ['src/*.less'],
        tasks: ['less'],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};