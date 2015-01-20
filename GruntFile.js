module.exports = function (grunt) {
  grunt.initConfig({
    nodewebkit: {
                  options: {
                            //version: '0.9.2',
                            build_dir: './dist',
                            mac: true,
                            win: false,
                            linux32: true,
                            linux64: true
                },
                src: [
                  './src/**/*',
                  './node_modules/**/*',
                ]
            },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
}
