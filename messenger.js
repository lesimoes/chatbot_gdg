var request = require('request');

var token = "EAAGmWBQO9O4BAI6ZAlZCmY0PFFHfs2dE24CBrIPK0rTNeYFPgmLa3Ls6ZB0dtNZCYfGqWSoY7wf3prIB9X2pFwygvROXVf062c6P1yfxTzI0JNElMSNDl9F0duUgwIoTOFGjr5ilX1eZCpZBsCrtqEl1QNl0DnPUQKDYnO78v6lAZDZD";

exports.sendMessage = function (sender, text_) {
  var text_ = text_.substring(0, 319);
	messageData = {};
  messageData = {	text: text_ };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
