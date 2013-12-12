/*
 * grunt-audiospritler
 * https://github.com/digitaltonic/grunt-audiospritler
 *
 * Copyright (c) 2013 Jon Webb
 * Licensed under the MIT license.
 */

'use strict';

var _     = require('lodash')._;
var path  = require('path');
var fs    = require('fs');

module.exports = function(grunt) {

  var createDestDirFromPath = function (filePath) {
    var destDir = path.dirname(filePath);

    if(destDir !== '.' && !fs.existsSync(destDir)) {
      fs.mkdir(destDir);
    }
  };

  grunt.registerMultiTask('audiospritler', 'Grunt plugin for audiospritler', function () {
    var done = this.async();

    var filePaths = [];

    // Set default options expected by the audiospritler executable
    var defaultOptions = {
      export: '',         // Limit exported file types. Comma separated extension list.
      log: 'info',        // Log level (debug, info, notice, warning, error).
      autoplay: null,     // Autoplay sprite name
      silence: 0,         // Add special "silence" track with specified duration.
      samplerate: 44100,  // Sample rate.
      channels: 1,        // Number of channels (1=mono, 2=stereo).
      rawparts: '',       // Include raw slices(for Web Audio API) in specified formats.
    };

    // Merge user supplied options into the defaultOptions for the final option set.
    var options = _.extend(defaultOptions, this.options());
    var binPath = options.binPath || './node_modules/audiospritler/audiospritler.js';
    var command = '';


    delete options.binPath;

    var spritlerArgs = [];

    Object.keys(options).forEach(function(key) {
      if(options[key] !== null && options[key] !== '') {
        spritlerArgs.push('--' + key + '=' + options[key]);
      }
    });

    // Check if user has provided all information required.
    var fileSectionsToProcess = this.files.length;
    var sectionProcessedCount = 0;

    if(fileSectionsToProcess > 0) {
      // Iterate over all specified file groups.

      this.files.forEach(function(f) {

        if(f.src.length > 0) {

          createDestDirFromPath(f.dest);

          grunt.util.spawn({
            cmd: binPath,
            args: Array.prototype.concat('--output=' + f.dest, spritlerArgs, f.src)
          }, function (error, result, something) {
            if(error && error.length > 0) {
              grunt.fail.fatal(error.toString());
            }
            else {
              console.log(result.toString());
              if(++sectionProcessedCount === fileSectionsToProcess) {
                done();
              }
            }

          });

        } else { // Fail the task
          grunt.fail.fatal('No files found to sprite');
        }
      });
    } else {
      grunt.fail.fatal('You must provide files to this task.');
    }

  });

};
