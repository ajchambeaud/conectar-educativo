module.exports = function (grunt) {
  grunt.initConfig({
    nodewebkit: {
                  options: {
                            //version: '0.9.2',
                            build_dir: './dist',
                            mac: true,
                            win: true,
                            linux32: false,
                            linux64: false
                },
                src: [
                  './src/**/*',
                  './node_modules/**/*',
                ]
            },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
}
