"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imap_1 = __importDefault(require("imap"));
const util_1 = require("util");
const nodemailer_1 = __importDefault(require("nodemailer"));
const events_1 = __importDefault(require("events"));
;
var DataType;
(function (DataType) {
    DataType["MESSAGE"] = "message";
    DataType["SYSTEM"] = "system";
})(DataType = exports.DataType || (exports.DataType = {}));
;
class MailTube extends events_1.default {
    connect(options) {
        this.initIMAP(options.imap);
        this.initSMTP(options.smtp);
    }
    send(data) {
        this.smtp.sendMail({
            from: data.from,
            to: data.to,
            subject: `${data.type}:${data.secret}`,
            text: data.content
        }).then(console.log);
    }
    initSMTP(options) {
        this.smtp = nodemailer_1.default.createTransport(options);
    }
    initIMAP(options) {
        this.imap = new imap_1.default({ ...{
                inbox: 'INBOX',
                port: 993,
                tls: true,
                keepalive: true,
                tlsOptions: { rejectUnauthorized: false }
            }, ...options });
        const { imap } = this;
        let box;
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
                                console.log(prefix + 'Parsed header: %s', util_1.inspect(imap_1.default.parseHeader(buffer)));
                            else
                                console.log(prefix + 'Body [%s] Finished', util_1.inspect(info.which));
                        });
                    });
                    msg.once('attributes', function (attrs) {
                        console.log(prefix + 'Attributes: %s', util_1.inspect(attrs, false, 8));
                        setTimeout(() => {
                            imap.addFlags(attrs.uid, "Deleted", (err) => {
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
    }
}
module.exports = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBa0Q7QUFDbEQsK0JBQStCO0FBQy9CLDREQUFxRDtBQUVyRCxvREFBa0M7QUFLakMsQ0FBQztBQUVGLElBQVksUUFBbUQ7QUFBL0QsV0FBWSxRQUFRO0lBQUcsK0JBQW1CLENBQUE7SUFBRSw2QkFBaUIsQ0FBQTtBQUFDLENBQUMsRUFBbkQsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFBMkM7QUFBQSxDQUFDO0FBVWhFLE1BQU0sUUFBUyxTQUFRLGdCQUFZO0lBSS9CLE9BQU8sQ0FBQyxPQUEyQjtRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQWtCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztTQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQXNCO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFvQjtRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLEVBQUMsR0FBRztnQkFD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