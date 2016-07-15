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

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');


	grunt.registerTask('default',['concat', 'uglify', 'less', 'copy']);

};