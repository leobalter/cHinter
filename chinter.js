(function(window) {
    // modified version of XHR script by PPK, http://www.quirksmode.org/js/xmlhttp.html
    function sendRequest(url,callback) {
        var req = createXMLHTTPObject();
        if (!req) return;
        var method = "GET";
        req.open(method,url,true);
        //req.setRequestHeader('User-Agent','XMLHTTP/1.0');
        req.onreadystatechange = function () {
            if (req.readyState != 4) return;
            if (req.status != 200 && req.status != 304) {
                alert("HTTP error " + req.status + " occured.");
                return;
            }
            callback(req);
        };

        if (req.readyState == 4) return;
        req.send();
    }

    var XMLHttpFactories = [
        function () { return new XMLHttpRequest(); },
        function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
        function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
        function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
    ];

    function createXMLHTTPObject() {
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                return XMLHttpFactories[i]();
            } catch (e) {}
        }
        return false;
    }
    
    window.cHinter = function(sourceFile,options) {
        function validateFile(source) {
            var i, len, err,
                result = JSHINT(source, options);

            jsglobals();
            
            if (result) {
                return console.log('JSHint ok to ' + sourceFile);
            }
            
            jsfail(sourceFile);
        }
        
        function jsfail(sourceFile) {
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
        
        return sendRequest(sourceFile, function(source) {
            validateFile(source.responseText);
        });
    };  
})(window, undefined);
