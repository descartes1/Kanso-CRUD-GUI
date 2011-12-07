/**
 * Bindings to Kanso events
 */

var events = require('duality/events'),
    templates = require('duality/templates');

// This is the event handler for all events that DO NOT take place within
// the <div id="content"> in template/base.html
// The event handler is bound to the site further down in the init method.
// Note: 	A event handler within the <div id="content"> must be "re-bound", because
// 			they get lost if the <div id="content"> is updated.
//			Look at XYZ for that and read the really helpfull comment from
//			Caolan on http://groups.google.com/group/kanso/browse_thread/thread/44103a9a76bbd2d
exports.all_but_not_content = function () {

	// The following is pure "jquery style"
	// Go to http://docs.jquery.com for more information on that
	$(document).ready(function() {

		// Raise alert when user clicks somewhere into the footer.
    	$('#footer').click(function() {
			alert('Handler for .click() in #footer called.');
		});

	});
};


/**
 * The init method fires when the app is initially loaded from a page rendered
 * by CouchDB.
 */

/**
 * events.on('init', function () {
 *     // app initialization code goes here...
 * });
 */

events.on('init', function () {

	// Here the event handler from above is bound to the site
	exports.all_but_not_content();

});

/**
 * The sessionChange event fires when the app is first loaded and the user's
 * session information becomes available. It is also fired whenever a change
 * to the user's session is detected, for example after logging in or out.
 */

/**
 * events.on('sessionChange', function (userCtx, req) {
 *     // session change handling code goes here...
 * });
 */

events.on('sessionChange', function (userCtx, req) {

});

/**
 * The updateFailure event fires when an update function returns a document as
 * the first part of an array, but the client-side request to update the
 * document fails.
 */

events.on('updateFailure', function (err, info, req, res, doc) {
    alert(err.message || err.toString());
});
