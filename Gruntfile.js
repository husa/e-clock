module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: 'src/css/**/*.less',
                tasks: ['less:dev'],
            },
            jshint: {
                files: 'src/js/**/*.js',
                tasks: ['jshint']
            }
        },

        less: {
            dev: {
                files: {
                    "src/css/main.css": "src/css/less/main.less"
                }
            },
            build: {
                options : {
                    compress : true,
                    cleancss : true
                },
                files : {
                    "dist/css/main.css": "src/css/less/main.less"
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                undef: true,
                globals: {
                    document: false,
                    window: false,
                    console: false,
                    chrome: false
                }
            },
            src: ['src/js/**/*.js']
        },

        uglify: {
            build: {
                options: {
                    preserveComments: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/js/main.js': ['src/js/main.js']
                }
            }
        },

        copy: {
            build: {
                expand: true,
                cwd : 'src/',
                src : [
                    'html/**',
                    'manifest.json',
                    'css/fonts/**',
                    'img/**',
                    '_locales/**'
                ],
                dest : 'dist/'
            }
        },

        compress : {
            build : {
                options : {
                    archive : 'dist.zip',
                    mode : 'zip'
                },
                src : ['dist/**']
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['less:dev', 'watch']);
    grunt.registerTask('build', ['less:build', 'uglify:build', 'copy:build', 'compress:build']);

};
