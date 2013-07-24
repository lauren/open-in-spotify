module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Open in Spotify JS v<pkg.version> | Copyright 2013 Lauren Sperber https://github.com/lauren/open-in-spotify/blob/master/LICENSE | <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/selectors.js', 'src/music-controller.js', 'src/spotify-querier.js', 'src/render.js', 'src/<%= pkg.name %>.js', 'src/shims.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    less: {
      production: {
        options: {
          compress: true
        },
        files: {
          "build/<%= pkg.name %>.css": "src/s<%= pkg.name %>.less"
        }
      }
    },
    watch: {
      js: {
        files: ['src/*.js'],
        tasks: ['jshint', 'uglify'],
      },
      less: {
        files: ['src/*.less'],
        tasks: ['less'],
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/*.js', 'test/**/*.js'],
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