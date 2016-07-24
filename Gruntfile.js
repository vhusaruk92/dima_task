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
			    tasks: ['copy'],
		    },
   		    less: {
    		    files: ['src/**/*.less'],
    		    tasks: ['less', 'copy'],
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


	grunt.registerTask('default',['concat', 'uglify', 'less', 'copy']);
	grunt.registerTask('server', ['connect','watch']);

};
