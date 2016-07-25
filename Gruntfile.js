module.exports=function(grunt){

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

	  concat: {
			main: {
			  src: ['src/js/index.js'],
			  dest: 'temp/js/main.js',
			},
			jquery: {
				src:['bower_components/jquery/dist/jquery.min.js'],
				dest:'temp/js/jquery.js'
			},
			bootsrap: {
				src:['bower_components/bootstrap/dist/js/bootstrap.min.js'],
				dest:'temp/js/bootstrap.js'
			},
			components: {
				src:['bower_components/AniJS/dist/anijs-min.js', 'bower_components/AniJS/dist/helpers/scrollreveal/anijs-helper-scrollreveal-min.js', 'bower_components/AniJS/dist/helpers/scrollreveal/anijs-helper-scrollreveal-min.js', 'bower_components/lightslider/dist/js/lightslider.min.js'],
				dest:'temp/js/components.js'
			}
		},

		jshint: {
			options: {
		    jshintrc: '.jshintrc'
		  },
			files: {
        src: ['temp/js/main.js']
      },
	  },

		uglify: {
			options: {
			 stripBanners: true,
			 banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
			        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
		    build: {
		      src:'temp/js/main.js',
		      dest:'temp/js/main.js'
		    }

		},

		less: {
		  development: {
		    options: {
		      paths: ['assets/less']
		    },
		    files: {
		      'temp/css/main.css': 'src/less/style.less',
					'temp/css/components.css': 'src/less/components.less',
					'temp/css/bootsrap.css': 'src/less/bootsrap.less'
		    },
		  }
		},

		htmlhint: {
		  options: {
		    htmlhintrc: '.htmlhintrc'
		  },
		  html1: {
		    src: ['temp/index.html']
		  }
		},

		csslint: {
		  options: {
		    csslintrc: '.csslintrc'
		  },
	    strict: {
	        options: {
	            import: 2
	        },
	        src: ['temp/css/main.css']
	    }
		},

		copy: {
		  main: {
		    files: [
		      {expand: true, flatten: true, src: ['src/index.html'], dest: 'temp/'},
		      {expand: true, flatten: true, src: ['src/icons/*'], dest: 'temp/icons/'},
		      {expand: true, flatten: true, src: ['src/fonts/*'], dest: 'temp/fonts/'},
		      {expand: true, flatten: true, src: ['src/images/*'], dest: 'temp/images/'},
		      {expand: true, src: ['bower_components/**/*'], dest: 'temp/'}
		    ],
		  },
		},

		connect: {
	      server: {
	        options: {
	        port: 9000,
	        base: 'temp/.',
	        hostname: '0.0.0.0',
	        protocol: 'http',
	        livereload:35729,
	        open: true,
	        }
	      }
	    },

		watch: {
			another: {
			    files: ['src/icons/*', 'src/fonts/*', 'src/images/*', 'src/index.html'],
			    tasks: ['copy', 'htmlhint'],
		    },
   		    less: {
    		    files: ['src/**/*.less'],
    		    tasks: ['less', 'copy','csslint'],
        	},
    		scripts: {
  			    files: ['src/**/*.js'],
 			    tasks: ['concat', 'uglify', 'copy'],
 			},
 			options: {
		        livereload: true,
		    },
		},

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['concat', 'jshint', 'uglify', 'less', 'copy', 'csslint', 'htmlhint']);
	grunt.registerTask('server', ['connect','watch']);

};
