(function(window) {
    window.JSHinter = function(sourceText , options) {
        function validateFile(source) {
            var i, len, err,
                result = JSHINT(source, options);
                
            $('#JSHintErrors').empty();

            if (result) {
                return $('#JSHintResult').html('<p id="JSHintSuccess">JSHint passed ok!</p>');
            }
            
            $('#JSHintResult').html('<p id="JSHintError">Your code is not great yet!</p>');
            jsfail();
        }
        
        function jsfail() {
            var JSErrors = $('#JSHintErrors'), JSErrorsText = '';
            JSErrors.empty();
            
            for (i = 0, len = JSHINT.errors.length; i < len; i++) {
                err = JSHINT.errors[i];
                if (!err) {
                    continue;
                }

                JSErrorsText = err.reason + " on line " + err.line + ", character " + err.character;
                
                $('<li />').appendTo(JSErrors).text(JSErrorsText);
            }
        }
        
        return validateFile(sourceText);
    };
})(window, undefined);
