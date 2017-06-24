var compressor = require('node-minify');

// Using Google Closure Compiler 
compressor.minify({
    compressor: 'no-compress',
    input: ['components/crypto-js-3.1.9-1.js', 'components/aes-3.1.9-1.js', 'components/wakanda-service.js'],
    output: 'dist/wakanda.js',
    callback: function (err, min) {
        console.log('Merging files: components/crypto-js-3.1.9-1.js', 'components/aes-3.1.9-1.js', 'components/wakanda-service.js')
        compressor.minify({
            compressor: 'gcc',
            input: 'dist/wakanda.js',
            output: 'dist/wakanda-min.js',
            callback: function (err, min) {
                console.log('Minyfing: components/crypto-js-3.1.9-1.js', 'components/aes-3.1.9-1.js', 'components/wakanda-service.js')
            }
        });
    }
});

