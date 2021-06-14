"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var imap_1 = require("imap");
var util_1 = require("util");
var nodemailer_1 = require("nodemailer");
var events_1 = require("events");
;
var DataType;
(function (DataType) {
    DataType["MESSAGE"] = "message";
    DataType["SYSTEM"] = "system";
})(DataType = exports.DataType || (exports.DataType = {}));
;
var MailTube = /** @class */ (function (_super) {
    __extends(MailTube, _super);
    function MailTube() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailTube.prototype.connect = function (options) {
        this.initIMAP(options.imap);
        this.initSMTP(options.smtp);
    };
    MailTube.prototype.send = function (data) {
        this.smtp.sendMail({
            from: data.from,
            to: data.to,
            subject: data.type + ":" + data.secret,
            text: data.content
        }).then(console.log);
    };
    MailTube.prototype.initSMTP = function (options) {
        this.smtp = nodemailer_1["default"].createTransport(options);
    };
    MailTube.prototype.initIMAP = function (options) {
        this.imap = new imap_1["default"](__assign({
            inbox: 'INBOX',
            port: 993,
            tls: true,
            keepalive: true,
            tlsOptions: { rejectUnauthorized: false }
        }, options));
        var imap = this.imap;
        var box;
        imap.once('ready', function () {
            imap.on('mail', function (count) {
                readMail(count);
            });
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
            }
            openInbox(function (err, mailbox) {
                if (err)
                    throw err;
                box = mailbox;
            });
            function readMail(count) {
                var f = imap.seq.fetch(count + ':*', { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
                f.on('message', function (msg, seqno) {
                    console.log('Message #%d', seqno);
                    var prefix = '(#' + seqno + ') ';
                    msg.on('body', function (stream, info) {
                        if (info.which === 'TEXT')
                            console.log(prefix + 'Body [%s] found, %d total bytes', util_1.inspect(info.which), info.size);
                        var buffer = '', count = 0;
                        stream.on('data', function (chunk) {
                            count += chunk.length;
                            buffer += chunk.toString('utf8');
                            if (info.which === 'TEXT')
                                console.log(prefix + 'Body [%s] (%d/%d)', util_1.inspect(info.which), count, info.size);
                        });
                        stream.once('end', function () {
                            if (info.which !== 'TEXT')
                                console.log(prefix + 'Parsed header: %s', util_1.inspect(imap_1["default"].parseHeader(buffer)));
                            else
                                console.log(prefix + 'Body [%s] Finished', util_1.inspect(info.which));
                        });
                    });
                    msg.once('attributes', function (attrs) {
                        console.log(prefix + 'Attributes: %s', util_1.inspect(attrs, false, 8));
                        setTimeout(function () {
                            imap.addFlags(attrs.uid, "Deleted", function (err) {
                                console.log(err);
                            });
                        }, 100);
                    });
                    msg.once('end', function () {
                        console.log(prefix + 'Finished');
                    });
                });
                f.once('error', function (err) {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', function () {
                    console.log('Done fetching all messages!');
                });
            }
        });
        imap.once('error', function (err) {
            console.log(err);
        });
        imap.once('end', function () {
            console.log('Connection ended');
        });
        imap.connect();
    };
    return MailTube;
}(events_1["default"]));
module.exports = {};
