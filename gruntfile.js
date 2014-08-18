module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
    ' Licensed MIT */\n',

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['assets/scripts/src/*.js'],
        dest: 'assets/scripts/main.js',
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      dist: {
        files: {
          'assets/scripts/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/styles/main.css':  'assets/styles/src/main.scss',
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 10 version', 'ie 6', 'ie 7', 'ie 8', 'ie 9']
      },
      single_file: {
        src: 'assets/styles/main.css',
        dest: 'assets/styles/main.css'
      },
    },

    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "localhost",
          open: true,
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.files %>',
        tasks: ['jshint:gruntfile']
      },
      sass: {
        files: 'assets/styles/src/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
      concat: {
        files: 'assets/scripts/src/**/*.js',
        tasks: ['concat', 'uglify'],
      },
      all: {
        files: ['assets/styles/*.css', 'assets/scripts/*.{min.js, js}', 'images/**/*.{png,jpg,jpeg,gif}', '*.html'],
        options: {
          livereload: true,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['concat', 'sass', 'autoprefixer', 'connect', 'watch']);
};