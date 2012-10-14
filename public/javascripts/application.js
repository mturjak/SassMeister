/*
bindWithDelay jQuery plugin
Author: Brian Grinstead
MIT license: http://www.opensource.org/licenses/mit-license.php

http://github.com/bgrins/bindWithDelay
*/
(function($) {
  $.fn.bindWithDelay = function( type, data, fn, timeout, throttle ) {
  	if ( $.isFunction( data ) ) {
  		throttle = timeout;
  		timeout = fn;
  		fn = data;
  		data = undefined;
  	}

  	// Allow delayed function to be removed with fn in unbind function
  	fn.guid = fn.guid || ($.guid && $.guid++);

  	// Bind each separately so that each element has its own delay
  	return this.each(function() {
      var wait = null;

      function cb() {
        var e = $.extend(true, { }, arguments[0]);
        var ctx = this;
        var throttler = function() {
        	wait = null;
        	fn.apply(ctx, [e]);
        };
        
        if (!throttle) { clearTimeout(wait); wait = null; }
        if (!wait) { wait = setTimeout(throttler, timeout); }
      }

      cb.guid = fn.guid;

      $(this).bind(type, data, cb);
  	});
  }
})(jQuery);
/* --- END bindWithDelay --- */


(function($) {
  var sass = ace.edit("sass");
  sass.setTheme("ace/theme/dawn");
  sass.getSession().setMode("ace/mode/scss");

  var css = ace.edit("css");
  css.setTheme("ace/theme/dawn");
  css.setReadOnly(true);
  css.getSession().setMode("ace/mode/scss");

  $("a[href^='http://'], a[href^='https://']").attr("target","_blank");

  sass.getSession().on('change', function(e) {
    window.setTimeout(function() {$("#sass-form").submit();}, 500);
  });

  $('select').on('change', function() {
    $("#sass-form").submit();
  });


  /* attach a submit handler to the form */
  $("#sass-form").submit(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    var inputs = {
      sass: sass.getValue(),
      syntax: $('select[name="syntax"]').val(),
      plugin: $('select[name="plugin"]').val(),
      output: $('select[name="output"]').val()
    }

    /* Send the data using post and put the results in a div */
    $.post($(this).attr('action'), inputs,
      function( data ) {
        css.setValue(data,-1);
      }
    );
  });
})(jQuery);