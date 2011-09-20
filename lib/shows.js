/**
 * Show functions to be exported from the design doc.
 */

var events = require('kanso/events'),
	templates = require('kanso/templates'),
    forms = require('kanso/forms'),
    types = require('./types');

// This is a event handler for events that take place within
// the <div id="content"> in template/base.html
// The event handler is bound to the site further down in exports.jqueryui
// Note: 	A event handler within the <div id="content"> must be "re-bound", because
// 			they get lost if the <div id="content"> is updated.
//			Read the really helpfull comment from Caolan on
//			http://groups.google.com/group/kanso/browse_thread/thread/44103a9a76bbd2d
exports.within_content = function () {

	// The following is pure "jquery style"
	// Go to http://docs.jquery.com for more information on that
	$(document).ready(function() {

		// Accordion
		$("#accordion").accordion({ header: "h4" });
	
		// Tabs
		$('#tabs').tabs();
	
		// Dialog			
		$('#dialog').dialog({
			autoOpen: false,
			width: 600,
			buttons: {
				"Ok": function() { 
					$(this).dialog("close"); 
				}, 
				"Cancel": function() { 
					$(this).dialog("close"); 
				} 
			}
		});
				
		// Dialog Link
		$('#dialog_link').click(function(){
			$('#dialog').dialog('open');
			return false;
		});

		// Datepicker
		$('#datepicker').datepicker({
			inline: true
		});
		
		// Slider
		$('#slider').slider({
			range: true,
			values: [17, 67]
		});
		
		// Progressbar
		$("#progressbar").progressbar({
			value: 20 
		});
		
		//hover states on the static widgets
		$('#dialog_link, ul#icons li').hover(
			function() { $(this).addClass('ui-state-hover'); }, 
			function() { $(this).removeClass('ui-state-hover'); }
		);

	});
};

// Show the jQueryUI Demo page
exports.jqueryui = function (doc, req) {

	// Here the event handler from above is bound to the site
	events.once('afterResponse', function (info, req, res) {
		// bind event handlers
		exports.within_content();
	});

    return {
		title: 'jqueryUI',
		content: templates.render('jqueryui.html', req, {})
    };
};

// Show login form
exports.login = function (doc, req) {

	// New form
	var form = new forms.Form(types.login, null, {});

    // render the markup for a login form
    var content = templates.render('login.html', req, {
        form_title: 'Login',
		form: form.toHTML(req)
    });

	// return the title and the rendered form
	return {
		title: 'Login',
		content: content
	};
};

// Show add a phrase form
exports.addphrase = function (doc, req) {

	// New form
	var form = new forms.Form(types.phrase, null, {
        exclude: ['created']
    });

    // render the markup for a add form
    var content = templates.render('addphrase.html', req, {
        form_title: 'Add new phrase',
		form: form.toHTML(req)
    });

	// return the title and the rendered form
    return {
		title: 'Add new phrase',
		content: content
	};
};

// Show change a phrase form
exports.changephrase = function (doc, req) {

		// New form populated with values from the doc that should be changed
		var form = new forms.Form(types.phrase, doc, {
    	    exclude: ['created']
    	});

    	// render the markup for a change form
    	var content = templates.render('changephrase.html', req, {
    	    form_title: 'Change phrase',
			form: form.toHTML(req)
    	});
	
		// return the title and the rendered form
    	return {
			title: 'Change phrase',
			content: content
		};
};

// Show one phrase
exports.phrase = function (doc, req) {
    return {
        title: doc.title,
        content: templates.render('phrase.html', req, doc)
    };
};

// Show the start page
exports.start = function (doc, req) {

    return {
		title: 'Startpage',
		content: templates.render('start.html', req, {})
    };
};

// Show 404 - not found page
exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};
