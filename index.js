
require('util').inherits(SteamEmailAuth, require('events').EventEmitter);
var Imap = require("imap");
function SteamEmailAuth(options) {

    this.options = options;
    
    this.options.port = this.options.port || 993;
    this.options.tls  = this.options.tls  || true;


}

module.exports = SteamEmailAuth;

// type: "web", "computer", "" or nothing
SteamEmailAuth.prototype.fetchLastAuthCode = function (options, callback) {

    var type = options.type || ""
    var username = options.username || ""
    

    var _this = this;
    var imap = new Imap(this.options);

    imap.once('error', function (err) {
        _this.emit("error",err);
    });
    
    var date = new Date();
    date.setTime(date.getTime() - 1000 * 60 * 60 * 24);
    

    imap.once('ready', function () {
        imap.openBox('INBOX', true, function (err, box) {
            imap.search( [
                //"UNSEEN", // Maybe this will help speeding up? But maybe we miss some mail :s 
                ["FROM", "noreply@steampowered.com"],
                ["SUBJECT", "Access from new" + type],
                ["BODY","Dear "+ username],
                ["SENTSINCE", date]
            ], function (err, results) {
                var last = [results[results.length - 1]];
                if (!last) {
                    if (callback)
                        callback() // return nothing
                    return
                }
                    
                var f = imap.fetch(last, {
                    bodies: 'TEXT' ,
                    markSeen: false
                });
                f.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                        var data = "";
                        stream.on('data', function (chunk) {
                            data += chunk;
                        });
                        
                        stream.on('end', function () {
                            var pattern = /\<span style="font-size: 24px; color: #66c0f4; font-family: Arial, Helvetica, sans-serif; font-weight: bold;"\>([0-9A-Z]{5})\<\/span\>/;
                            var match = data.match(pattern) || {};
                            if (callback)
                                callback(match[1]);
                        });
                    });
                });
                
                f.once('error', function (err) {
                    console.log('IMAP Fetch error: ' + err);
                });
                f.once('end', function () {
                    imap.closeBox(function () {
                        imap.end();                       
                    });
                });
            });
        });
    });
    imap.connect();

}

/*
 * Events:
 *  error               on error
 *  
 */
