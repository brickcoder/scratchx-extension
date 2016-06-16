(function(ext) {
    var host = 'http://localhost:9555';

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.call_http = function(location, callback) {
        $.ajax({
              url: host + '/test'
        });
    };

    ext.sendRawCommand = function(rawIrCommand) {
        $.ajax({
              url: host + '/sendRaw/'+rawIrCommand
        });
    };

    // Detect language
    var contentLanguage = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    contentLanguage = contentLanguage.substr(0, 2);

    var language = 'en';
    var supportedLanguages = ['en', 'de'];
    var isContentLanguageSupported = (supportedLanguages.indexOf(contentLanguage) > -1);
    if (isContentLanguageSupported) {
        language = contentLanguage;
    }

    var blocks = {
      en: [
          [' ', 'call http', 'call_http'],
          [' ', 'turn all off', 'call_http'],
          [' ', 'turn %m.device on', 'call_http', '1 RED'],
          [' ', 'turn %m.device off', 'call_http', '1 RED'],
          [' ', 'set direction of %m.device to %m.direction', 'call_http', '1 RED','forward'],
          [' ', 'set power of %m.device to %m.power', 'call_http', '1 RED','7'],
          [' ', 'send raw command %n', 'sendRawCommand', 407],
      ],
      de: [
          [' ', 'call http', 'call_http'],
          [' ', 'Schalte alle aus', 'call_http'],
          [' ', 'Schalte %m.device ein', 'call_http', '1 ROT'],
          [' ', 'Schalte %m.device aus', 'call_http', '1 ROT'],
          [' ', 'Setze Richtung von %m.device auf %m.direction', 'call_http', '1 ROT','forwärts'],
          [' ', 'Setze Leistung von %m.device auf %m.power', 'call_http', '1 ROT','7'],
          [' ', 'Sende Kommando %n', 'sendRawCommand', 407],
      ]
    };

    var menus = {
      en: {
          device: ['1 RED', '1 BLUE', '2 RED', '2 BLUE', '3 RED', '3 BLUE', '4 RED', '4 BLUE'],
          power: ['0', '1', '2', '3', '4', '5', '6', '7'],
          direction: ['forward', 'backward'],
      },
      de: {
          device: ['1 ROT', '1 BLAU', '2 ROT', '2 BLAU', '3 ROT', '3 BLAU', '4 ROT', '4 BLAU'],
          power: ['0', '1', '2', '3', '4', '5', '6', '7'],
          direction: ['forwärts', 'rückwärts'],
      }
    };

    var descriptor = {
        blocks: blocks[language],
        menus: menus[language],
        url: 'http://brickcoder.github.io/scratchx-extension'
    };

    ScratchExtensions.register('Brickcoder', descriptor, ext);
})({});
