module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
      less: {
        files: ['*.less'],
        tasks: ['less'],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};