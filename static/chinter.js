(function(window) {
    window.cHinter = function(sourceText , options) {
        function validateFile(source) {
            var i, len, err,
                result = JSHINT(source, options);

            jsglobals();
            
            if (result) {
                return console.log('JSHint passed OK!');
            }
            
            jsfail();
        }
        
        function jsfail() {
            for (i = 0, len = JSHINT.errors.length; i < len; i++) {
                err = JSHINT.errors[i];
                if (!err) {
                    continue;
                }

                console.error(err.reason + " on line " + err.line + ", character " + err.character);
            }
        }
        
        function jsglobals() {
            if (! JSHINT.data().implieds ){
                return;
            }
            
            var i, globals = JSHINT.data().implieds;
            for (i = 0, len = globals.length; i < len; i++) {
                console.log('Globals used: "' + globals[i].name + '" on lines ' + globals[i].line.join(','));
            }
        }
        
        return validateFile(sourceText);
    };  
})(window, undefined);
