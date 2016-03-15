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
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    site: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= site.app %>/js/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      sass: {
        files: ['<%= site.app %>/sass/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
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

    sass: {
      options: {
        debugInfo: false,
        lineNumbers: false
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '<%= site.app %>/sass',
          src: '**/*.{scss,sass}',
          dest: '<%= site.dist %>/css',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%= site.app %>/sass',
          src: '**/*.{scss,sass}',
          dest: '.tmp/css',
          ext: '.css'
        }]
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
          '<%= site.app %>/js/{,*/}*.js'
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
        expand: true,
        cwd: '.tmp',
        src: '**/{css,concat}/*.css',
        dest: '.tmp'
      },
      build: {
        expand: true,
        cwd: '<%= site.dist %>',
        src: '**/{css,concat}/*.css',
        dest: '<%= site.dist %>'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= site.app %>/sass',
        cssDir: 'css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= site.app %>/images',
        javascriptsDir: '<%= site.app %>/js',
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

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= site.dist %>/js/{,*/}*.js',
          '<%= site.dist %>/styles/{,*/}*.css',
          '<%= site.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= site.dist %>/img'
        }]
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= site.dist %>'
      },
      html: '<%= site.dist %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= site.dist %>', '<%= site.dist %>/img']
      },
      html: ['<%= site.dist %>/**/*.html'],
      css: ['<%= site.dist %>/css/**/*.css']
    },

    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
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
        files: [
          {
            expand: true,
            dot: true,
            cwd: './',
            dest: '<%= site.dist %>',
            src: [
              'index.html',
              'flags/**/*',
              'languages.xml',
              '.htaccess',
            ]
          }, 
          {
            expand: true,
            cwd: 'img',
            dest: '<%= site.dist %>/images',
            src: ['generated/*']
          }
        ]
      },
      
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= site.app %>/sass',
          src: '**/*.css',
          dest: '.tmp/css'
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
        'compass:server',
	      'copy:stageCss'

      ],
      dist: [
        'sass:dist',
        'copy:dist'
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

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'imagemin',
    'cssmin',
    'usemin',
    'autoprefixer'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
