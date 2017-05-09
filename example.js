var SteamEmailAuth = require('steam-email-auth');
var request = require('request');

var auth = new SteamEmailAuth({
    user: 'user@gmail.com',
    password: "gmailpass",
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

auth.fetchLastAuthCode({username: "steamusername"}, function (url) { 
	var options = {
        	url: url,
        	headers: {
            		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
        	}
	};
	 
	function callback(error, response, body) {
		if (error) {
			console.log("There was an error requesting the URL: " + error.message);
		} else {
			console.log("URL requested successfully");
		}
	}
	request(options, callback); //run request on URL
});
