# node-steam-email-auth 

This is a nodejs package for steam email auth.
It uses IMAP to fetch the latest emails and gives you the last key it could get.

####Example Usage
```
var auth = new SteamEmailAuth({
    user: 'user@gmail.com',
    password: "gmailpass",
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

auth.fetchLastAuthCode({}, function (key) {
    console.log("Key: "+ key)
});
```

If you use the email for multiple accounts, you should prefer this call:

```
auth.fetchLastAuthCode({
    username: "username here!"
}, function (key) {
    console.log("Key: "+ key)
});


```

## Methods

### auth.fetchLastAuthCode(options, callback)

Creates a new IMAP connection and returns the goard key it has found.
* `options` - an object representing the configuration. Can be {}.
  * `username` (optional) - The username (login) whick key we are searching. Use this if you have multiple steam accounts on this email.
  * `type` (optional) - "web", "computer" or nothing. To filter what type of auth you need (web is also mobile).
* `callback(key)`  - a function, getting the guard key as first argument.
  * `key` - The guard key. NULL if none has been found.
