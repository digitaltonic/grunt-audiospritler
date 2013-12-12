# grunt-audiospritler

> Grunt plugin for audiospritler

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-audiospritler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-audiospritler');
```

## The "audiospritler" task

### Overview
In your project's Gruntfile, add a section named `audiospritler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  audiospritler: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

These options are identical in data type as they are name to the audiospritler package, and passed through by this Grunt plugin.

#### options.export
Type: `String`
Default value: `',  '`

A comma seperated string value that is used to limit the audio types which are to be exported, by default it will try to export every format the system supports. Example usage is `{ export: 'mp3,aac' }` to limit it to export only mp3 and aac versions.


      silence: 0,         // Add special "silence" track with specified duration.
      channels: 1,        // Number of channels (1=mono, 2=stereo).
      rawparts: '',
#### options.autoplay
Type: `Boolean`
Default value: `false`

Determines if Howler should autoplay the file.

#### options.silence
Type: `Integer`
Default value: `0`

The amount of

#### options.samplerate
Type: `Integer`
Default value: `44100`

The audio sample rate for the exported sound files.

#### options.channels
Type: `Integer`
Default value: `1`

Number of channels (1=mono, 2=stereo).

#### options.rawparts
Type: `String`
Default value: ``

A comma seperated list of formats to be sliced in order for the Web Audio API

### Usage Examples

In this example, we want to make howler autoplay, and export only to mp3 and aac. And, we want to build a sprite from all the wav files in the src/sounds directory to the sprites directory with each sprite having the name my-sound.*

```js
grunt.initConfig({
  audiospritler: {
    options: {},
    files: {
      'sprite/my-sound': ['src/*.wav'],
    },
  },
});

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
