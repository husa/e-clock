module.exports = ->

  error =
    level: 'error'
  warn =
    level: 'warn'
  ignore =
    level: 'ignore'

  paths =
    coffee: 'src/coffee/*.coffee'
    stylus: 'src/stylus/main.styl'
    stylusall: 'src/stylus/*.styl'

  @initConfig

    pkg: @file.readJSON 'package.json'

    watch:
      stylus:
        files: paths.stylusall
        tasks: ['stylus:dev']
      coffeeMain:
        files: paths.coffee
        tasks: ['coffeelint', 'coffee:dev']
      coffeeTests:
        files: 'src/tests/specs/coffee/**/*.coffee'
        tasks: ['coffee:test', 'jasmine:main']

    stylus:
      dev:
        options:
          compress: false
        files:
          'src/css/main.css': paths.stylus
      build:
        options:
          compress: true
        files:
          'dist/css/main.css': paths.stylus

    coffee:
      dev:
        options:
          sourceMap: true
          join: true
        files:
          'src/js/main.js': paths.coffee
      test:
        files:
          'src/tests/specs/mainSpec.js': 'src/tests/specs/coffee/*.coffee'
      build:
        options:
          sourceMap: false
          join: true
        files:
          'src/js/main.js': paths.coffee

    coffeelint:
      app: paths.coffee
      options:
        camel_case_classes: ignore
        missing_fat_arrow: error
        max_line_length: ignore
        no_empty_functions: error
        no_empty_param_list: error
        no_interpolation_in_single_quotes: error
        no_stand_alone_at: error
        no_unnecessary_double_quotes: error
        prefer_english_operator: warn
        space_operators: warn
        spacing_after_comma: warn

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
          'fonts/**'
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
  @loadNpmTasks 'grunt-contrib-stylus'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-copy'
  @loadNpmTasks 'grunt-contrib-compress'
  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-contrib-jasmine'
  @loadNpmTasks 'grunt-coffeelint'

  @registerTask 'build', [
    'stylus:build'
    'coffeelint'
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
    'stylus:dev'
    'coffee:dev'
    'coffeelint'
    'watch'
  ]
