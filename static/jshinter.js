(function(window) {
    window.JSHinter = function(sourceText , options) {
        function validateFile(source, options) {
            var i, len, err,
                result = JSHINT(source, options);
                
            $('#JSHintErrors').empty();

            if (result) {
                return $('#JSHintResult').html('<p id="JSHintSuccess">JSHint passed ok!</p>');
            }
            
            $('#JSHintResult').html('<p id="JSHintFail">Your code is not great yet!</p>');
            jsfail();
        }
        
        function jsfail() {
            var JSErrors = $('#JSHintErrors'),
                JSErrorsText = '',
                JSEvidence = '';
            JSErrors.empty();
            
            for (i = 0, len = JSHINT.errors.length; i < len; i++) {
                err = JSHINT.errors[i];
                if (!err) {
                    continue;
                }

                JSErrorsText = err.reason + " on line " + err.line + ", character " + err.character;
                
                JSEvidence = $('<code />').text(err.evidence);
                
                $('<li />').appendTo(JSErrors).text(JSErrorsText).prepend(JSEvidence);
            }
        }
        
        return validateFile(sourceText, options);
    };
})(window, undefined);
