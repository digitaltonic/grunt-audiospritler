/*
 * grunt-audiospritler
 * https://github.com/digitaltonic/grunt-audiospritler
 *
 * Copyright (c) 2013 Jon Webb
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    audiospritler: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/deal1.mp3', 'test/fixtures/deal2.mp3'],
        },
      },
      custom_options: {
        options: {
          autoplay: true,
          export: 'mp3,ac3'
        },
        files: {
          'tmp/sprite': 'test/fixtures/*.mp3'
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'audiospritler', 'nodeunit']);

  // just run, without tests
  grunt.registerTask('run', ['clean', 'jshint', 'audiospritler']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
