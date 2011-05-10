jQuery(function($) {
   var $jshinter = $('#jshinter'),
        $loadJS = $('#loadExternalUrl');
        
   $(document).find('input, textarea').attr('disabled', false);
   
   $jshinter.submit(function(ev) {
       ev.preventDefault();
       var jscode = $('#jscode').val();
       JSHinter(jscode);
   });
   
   $('#loadExternalUrl').submit(function(ev) {
       ev.preventDefault();
       var jsurl = $('#file').val();
      
       $.ajax('/file/'+jsurl, {
           dataType: 'text',
           success: function(data) {
               $('#jscode').val(data);
           }
       });
   });
});