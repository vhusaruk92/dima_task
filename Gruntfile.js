module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

	    concat: {
			dist: {
			   src: ['src/js/lightslider.js','src/js/index.js'],
			   dest: 'temp/concat.js',
			},
		},

		uglify: {
			options: {
			 stripBanners: true,
			 banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
			        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
		    build: {
		      src:'temp/concat.js',
		      dest:'temp/concat.min.js'
		    }
		},

		less: {
		  development: {
		    options: {
		      paths: ['assets/css']
		    },
		    files: {
		      'temp/result.css': 'src/css/*.less'
		    }
		  },
		  production: {
		    options: {
		      paths: ['assets/css'],
		      plugins: [
		        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
		        new (require('less-plugin-clean-css'))
		      ],
		    },
		    files: {
		      'temp/result.css': 'src/css/*.less'
		    }
		  }
		},

		copy: {
		  main: {
		    files: [
		      {expand: true, flatten: true, src: ['src/index.html'], dest: 'temp/'},
		    
		      {expand: true, flatten: true, src: ['src/icons/*'], dest: 'temp/icons/'},
		      {expand: true, flatten: true, src: ['src/fonts/*'], dest: 'temp/fonts/'},
		      {expand: true, flatten: true, src: ['src/images/*'], dest: 'temp/images/'},
		    ],
		  },
		},

		watch: {
			another: {
			    files: ['src/icons/*', 'src/fonts/*', 'src/images/*', 'src/index.html'],
			    tasks: ['copy'],
		    },
   		    css: {
    		    files: ['**/*.css', '**/*.less'],
    		    tasks: ['less', 'copy'],
        	},
    		scripts: {
  			    files: ['**/*.js'],
 			    tasks: ['concat', 'uglify', 'copy', 'watch'],
 			},
		},

		connect: {
		    server: {
		      options: {
		        port: 9001,
		        base: 'temp/.',
		        open:true,
		        protocol:'http',
		        keepalive: true
		      }
		    },
		},

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('default',['concat', 'uglify', 'less', 'copy','connect', 'watch']);

};