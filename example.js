var SteamEmailAuth = require("./index.js");

var auth = new SteamEmailAuth({
    user: 'user@gmail.com',
    password: "gmailpass",
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

auth.fetchLastAuthCode({
    username: "username"
}, function (key) {
    console.log("Key: "+ key)
});







