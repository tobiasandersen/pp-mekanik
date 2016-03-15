'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'dev',
    dist: 'build'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    site: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= site.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= site.app %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      svg: {
        files: ['img/svg/{,*/}*.svg'],
        tasks: ['svgmin', 'svgstore']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
          'css/{,*/}*.css',
          '<%= site.dist %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= site.app %>/scripts/{,*/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= site.dist %>/{,*/}*',
            '!<%= site.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '',
          src: '{,*/}*.css',
          dest: ''
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= site.app %>/sass',
        cssDir: 'css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= site.app %>/images',
        javascriptsDir: '<%= site.app %>/scripts',
        fontsDir: '<%= site.app %>/styles/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= site.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= site.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= site.dist %>/img'
        }]
      }
    },

    svgmin: {
        options: {
            plugins: [
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false },
                { removeEmptyAttrs: false },
                { cleanupIDs: false },
                { removeUnknownsAndDefaults: false },
                { collapseGroups: false },
                { moveGroupAttrsToElems: false }
            ]
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'img/svg',
                src: '{,*/}*.svg',
                dest: '<%= site.dist %>/img'
            }]
        }
    },

    svgstore: {
        options: {
            prefix : 'shape-', // This will prefix each <g> ID
            cleanup: ['fill', 'style'],
            svg: {
                class: 'u-hide'
            }
        },
        default : {
            files: {
                'svg-defs.html': ['<%= site.dist %>/img/**/*.svg'],
            }
        }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= site.app %>',
          dest: '<%= site.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp}',
            'fonts/*',
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= site.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= site.app %>/styles',
        dest: '',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    }

  });

  grunt.registerTask('svgify', ['svgstore']);

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'svgmin',
      'svgstore',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
