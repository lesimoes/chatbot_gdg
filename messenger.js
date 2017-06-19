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

exports.getName = function (sender, callback) {
	request({
        url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name&access_token=EAAGmWBQO9O4BAI6ZAlZCmY0PFFHfs2dE24CBrIPK0rTNeYFPgmLa3Ls6ZB0dtNZCYfGqWSoY7wf3prIB9X2pFwygvROXVf062c6P1yfxTzI0JNElMSNDl9F0duUgwIoTOFGjr5ilX1eZCpZBsCrtqEl1QNl0DnPUQKDYnO78v6lAZDZD',
        method: 'GET',

    }, function (error, response, body) {

      //console.log(body);
      parseBody = JSON.parse(body);
      callback(parseBody.first_name, false);
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

exports.sendMessageWelcome = function (sender) {

	request({
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: token },
			method: 'POST',
			json: {
					recipient: { id: sender },
					message: {
						attachment: {
							type: "template",
							payload: {
								template_type: "button",
								text:"Vamos começar: O que você deseja fazer?",
								buttons:[
									{
										type:"postback",
										title:"Botão 1",
										payload:"Oi"
									},
									{
										type:"postback",
										title:"Botão 2",
										payload:"Oi"
									},
									{
										type:"postback",
										title:"Botão 3",
										payload:"Oi"
									}
								]
							}
						}
					},
			}
	}, function (error, response, body) {
			if (error) {
					console.log('Error sending message: ', error);
			} else if (response.body.error) {
					console.log('Error: ', response.body.error);
			}
	});


}


exports.sendMessageButtons = function (sender) {

	messageData = {};

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: {
              attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements: [{
                    title: "Título 01",
                    subtitle: "Textp",
                    item_url: "http://www.google.com.br",
                    image_url: "http://dontgo.com/wp-content/uploads/2016/06/bottom.jpg",
                    buttons: [{
                      type: "web_url",
                      url: "www.google.com.br",
                      title: "Title"
                    }],
                  }, {
                    title: "Título 02",
                    subtitle: "Texto",
                    image_url: "https://kit8.net/images/thumbnails/700/525/detailed/2/server.png?t=1469761870",
                    buttons: [{
                      type: "web_url",
                      url: "http://www.google.com.br",
                      title: "Title"
                    }]
                  },
                  {
                    title: "Título 03",
                    subtitle: "Texto",
                    image_url: "https://image.freepik.com/vetores-gratis/chamada-de-servico-ao-cliente_23-2147502239.jpg",
                    buttons: [{
                      type: "web_url",
                      url: "http://www.google.com.br",
                      title: "Title"
                    }]
                  }


                ]
                }
              }
            },
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
