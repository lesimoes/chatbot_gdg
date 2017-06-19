var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var messenger = require('./messenger');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var conversation_id = "";
var w_conversation = watson.conversation({
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || 'cec006ee-ea53-4f79-b518-d6c39f0088be',
    password: process.env.CONVERSATION_PASSWORD || 'pLeYwpzBdlrM',
    version: 'v1',
    version_date: '2016-07-11'
});
var workspace = process.env.WORKSPACE_ID || 'b9f5ffe5-76d1-4a6d-b3e1-c80afd443ce0';

//Recebe a ativação do messenger webhook
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'tokenlegal') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Erro de validação no token.');
});

//Recebe as mensagens
app.post('/webhook/', function (req, res) {
	var text = null;

    messaging_events = req.body.entry[0].messaging;
	for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;

        if (event.message && event.message.text) {
			text = event.message.text;
		}else if (event.postback && !text) {
			text = event.postback.payload;
		}else{
			break;
		}

		var params = {
			input: text,
			context: {"conversation_id": conversation_id}
		}

		var payload = {
			workspace_id: workspace
		};

		if (params) {
			if (params.input) {
				params.input = params.input.replace("\n","");
				payload.input = { "text": params.input };
			}
			if (params.context) {
				payload.context = params.context;
			}
		}
        // if(text.indexOf('Ola') >= 0)
        //     messenger.sendMessage(sender, 'Qualé');
        // else {
        //     messenger.sendMessage(sender, text);
        // }
		callWatson(payload, sender);
    }
    res.sendStatus(200);
});

function callWatson(payload, sender) {
	w_conversation.message(payload, function (err, convResults) {
        if (err) {
            return responseToRequest.send("Erro.");
        }

        if(convResults.intents[0].intent == 'hello' && convResults.intents[0].confidence > 0.9){
            messenger.sendMessageWelcome(sender);
        }

        if(convResults.intents[0].intent == 'existencia'){
            messenger.getName(sender, function (response) {
            let text = 'Olá ' + response + ' a resposta é 42!' ;
            messenger.sendMessage(sender, text);
          });

        }


		if(convResults.context != null)
    	   conversation_id = convResults.context.conversation_id;
        if(convResults != null && convResults.output != null){
			var i = 0;
			while(i < convResults.output.text.length){
				sendMessage(sender, convResults.output.text[i++]);
			}
		}

    });
}


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);
