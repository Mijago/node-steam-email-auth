# node-steam-email-auth 

This is a nodejs package for steam email auth.
It uses IMAP to fetch the latest emails and gives you the last key it could get.

This fork has been updated to support the new email format steam uses (URL verification instead of code).

## Installation
It is as easy as always:

```
npm install steam-email-auth
```

A reminder you may need to allow gmail for 'insecure apps' and possibly login to the account on the same IP in a browser for it to work.

## Example Usage
```
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
```

## Methods

### fetchLastAuthCode(options, callback)

Creates a new IMAP connection and returns the guard key it has found.
* `options` - an object representing the configuration. Can be {}.
  * `username` (optional) - The username (login) whick key we are searching. Use this if you have multiple steam accounts on this email.
* `callback(url)`  - a function, getting the url as first argument.
  * `url` - The url. NULL if none has been found.
