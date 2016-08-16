'use strict';

module.exports = function(grunt) {
  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ['build/**/*'],
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/app.css' : 'public/css/scss/app.scss'
        }
      }
    },

    autoprefixer: {
      main: {
        expand: true,
        flatten: true,
        src: 'public/css/*.css',
        dest: 'build/public/css'
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 5,
        },
        files: [{
          expand: true,
          cwd: 'build/public/images',
          src: ['**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.png'],
          dest: 'build/public/images',
        }]
      }
    },

    clean: ['build/'],

    copy: {
      main: {
        files: [{
          expand: true,
          src: ['public/**',  '!**/scss/**', '!**/config.rb'],
          dest: 'build/',
        }],
      },
    }

  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Grunt Tasks

  /*everyday work*/
  grunt.registerTask('default', [
    'watch'
  ]);

  // push to live
  grunt.registerTask('build', [
    'prebuild',
  ]);

  grunt.registerTask('prebuild', [
    'clean',
    'copy',
    'autoprefixer',
    'imagemin'
  ]);
};

