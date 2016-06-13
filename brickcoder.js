(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.my_first_block = function() {
        // Code that gets executed when the block is run
    };

    ext.call_http = function(location, callback) {
        $.ajax({
              url: 'http://localhost:9555/test'
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
            [' ', 'call http', 'call_http'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Brickcoder', descriptor, ext);
})({});
