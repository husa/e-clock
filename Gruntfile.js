module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch : {
      less : {
        files : 'css/**/*.less',
        tasks : ['less:dev'],
      },
    },

    less : {
      dev : {
        files : {
          "css/main.css" : "css/less/main.less"
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less', 'watch']);

};
