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

    ext.sendRawCommand = function(location, callback) {
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
            [' ', 'turn all off', 'call_http'],
            [' ', 'turn %m.device on', 'call_http', 'CH1 RED'],
            [' ', 'turn %m.device off', 'call_http', 'CH1 RED'],
            [' ', 'set direction of %m.device to %m.direction', 'call_http', 'CH1 RED','forward'],
            [' ', 'set power of %m.device to %m.power', 'call_http', 'CH1 RED','7'],
            [' ', 'send raw command %n', 'sendRawCommand', 407],
        ],
        menus: {
            device: ['CH1 RED', 'CH1 BLUE', 'CH2 RED', 'CH2 BLUE', 'CH3 RED', 'CH3 BLUE', 'CH4 RED', 'CH4 BLUE'],
            power: ['0', '1', '2', '3', '4', '5', '6', '7'],
            direction: ['forward', 'backward'],
        }
    };

    // Register the extension
    ScratchExtensions.register('Brickcoder', descriptor, ext);
})({});
