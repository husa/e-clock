module.exports = ->

  @initConfig

    pkg: @file.readJSON 'package.json'

    watch:
      less:
        files: 'src/css/**/*.less'
        tasks: ['less:dev']
      coffeeMain:
        files: 'src/coffee/**/*.coffee'
        tasks: ['coffee:dev']
      coffeeTests:
        files: 'src/tests/specs/coffee/**/*.coffee'
        tasks: ['coffee:test', 'jasmine:main']

    less:
      dev:
        files:
          'src/css/main.css': 'src/css/less/main.less'
      build:
        options:
          compress: true
          cleancss: true
        files:
          'dist/css/main.css': 'src/css/less/main.less'

    coffee:
      dev:
        options:
          sourceMap: true
          join: true
        files:
          'src/js/main.js': 'src/coffee/*.coffee'
      test:
        files:
          'src/tests/specs/mainSpec.js': 'src/tests/specs/coffee/*.coffee'
      build:
        options:
          sourceMap: false
          join: true
        files:
          'src/js/main.js': 'src/coffee/*.coffee'

    uglify:
      build:
        options:
          preserveComments: false,
          compress:
            drop_console: true
        files:
          'dist/js/main.js': [
            'src/js/main.js'
            'src/js/ga.js'
          ]

    copy:
      build:
        expand: true,
        cwd: 'src/',
        src: [
          'html/**'
          'manifest.json'
          'css/fonts/**'
          'img/**'
          '_locales/**'
        ],
        dest: 'dist/'

    compress:
      build:
        options:
          archive: 'dist.zip',
          mode: 'zip'
        src: ['dist/**']

    jasmine:
      dev:
        src: 'src/js/main.js'
        options:
          specs: 'src/tests/specs/*Spec.js'
          helpers: 'src/tests/specs/*Helper.js'
          # template: 'src/template.tpl'
          keepRunner: true
      build:
        src: 'dist/js/main.js'
        options:
          specs: 'src/tests/specs/*Spec.js'
          helpers: 'src/tests/specs/*Helper.js'



  # Load the plugins
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-contrib-less'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-copy'
  @loadNpmTasks 'grunt-contrib-compress'
  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-contrib-jasmine'

  @registerTask 'build', [
    'less:build'
    'coffee:build'
    'uglify:build'
    'copy:build'
    'compress:build'
  ]

  @registerTask 'test', [
    'coffee:dev'
    'coffee:test'
    'jasmine:dev'
  ]

  @registerTask 'default', [
    'less:dev'
    'coffee:dev'
    'watch'
  ]
