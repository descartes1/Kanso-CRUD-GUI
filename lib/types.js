/**
 * Kanso document types to export
 */

var Type = require('kanso/types').Type,
    fields = require('kanso/fields'),
    permissions = require('kanso/permissions'),
    widgets = require('kanso/widgets');


// a phrase
exports.phrase = new Type('phrase', {

	// Only logged in users can add, update or remove a phrase	
	permissions: {
        add:    permissions.loggedIn(),
        update: permissions.loggedIn(),
        remove: permissions.loggedIn(),
    },

	// a phrase has the following fields/schema
    fields: {
        created: fields.createdTime(),
		creator: fields.creator(),
        title: fields.string(),
		// The field for text input is is a normal string field.
		// Meaning the users input will be treaten as string.
		// However, the field should be presented as a textarea with 40 columns and 10 rows,
		// so we make use of the textarea widget. Use of a widget will tell Kanso
		// not WHAT the field is, but HOW the field should be DISPLAYED to the user.
		// Input to this textarea will be still a string.
		// More widgets can be found on http://kansojs.org/api/all.html#widgets   
        text: fields.string({
			widget: widgets.textarea({cols: 40, rows: 10})
		}),
    }
});

// a login
exports.login = new Type('login', {

	// a phrase has the following fields/schema
    fields: {
        user: fields.string(),
		// The password field is a normal string field.
		// Meaning the users input will be treaten as string.
		// However, the password should not be visible when entered by the user,
		// so we make use of the password widget.
		// Input to the text field will be displayed as a star or point by the users browser
		// more widgets can be found on http://kansojs.org/api/all.html#widgets   
		pass: fields.string({
			widget: widgets.password()
        }),
    }
});
