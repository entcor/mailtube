"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
const imap_1 = __importDefault(require("imap"));
// import { inspect } from 'util';
const nodemailer_1 = __importDefault(require("nodemailer"));
const events_1 = __importDefault(require("events"));
;
;
var DataType;
(function (DataType) {
    DataType["MESSAGE"] = "message";
    DataType["SYSTEM"] = "system";
})(DataType = exports.DataType || (exports.DataType = {}));
;
class MailTube extends events_1.default {
    connect(options) {
        if (options.imap)
            this.initIMAP(options.imap);
        if (options.smtp)
            this.initSMTP(options.smtp);
    }
    send(data) {
        this.smtp.sendMail({
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
        imap.once('ready', () => {
            imap.openBox(options.boxName, true, (err, _box) => {
                if (err)
                    throw err;
                box = _box;
                imap.on('mail', (count) => {
                    readMail(count);
                });
            });
            const readMail = (count) => {
                var f = imap.seq.fetch((box.messages.total - count + 1) + ':*', { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
                f.on('message', (msg, seqno) => {
                    const res = {};
                    msg.on('body', (stream, info) => {
                        var buffer = '';
                        stream.on('data', (chunk) => {
                            count += chunk.length;
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', () => {
                            res[info.which] = buffer;
                        });
                    });
                    msg.once('attributes', (attrs) => {
                        setTimeout(() => {
                            imap.addFlags(attrs.uid, "Deleted", (err) => {
                                if (err)
                                    console.error(err);
                            });
                        }, 100);
                    });
                    msg.once('end', () => {
                        this.emit('data', {
                            seqno: seqno,
                            res,
                        });
                    });
                });
                f.once('error', (err) => {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', () => {
                    // Done fetching all messages
                });
            };
        });
        imap.once('error', (err) => {
            console.log(err);
        });
        imap.once('end', () => {
            // Connection ended
        });
        imap.connect();
    }
}
exports.default = MailTube;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELGtDQUFrQztBQUNsQyw0REFBcUQ7QUFFckQsb0RBQWtDO0FBS2pDLENBQUM7QUFLRCxDQUFDO0FBRUYsSUFBWSxRQUFtRDtBQUEvRCxXQUFZLFFBQVE7SUFBRywrQkFBbUIsQ0FBQTtJQUFFLDZCQUFpQixDQUFBO0FBQUMsQ0FBQyxFQUFuRCxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUEyQztBQUFBLENBQUM7QUFTaEUsTUFBcUIsUUFBUyxTQUFRLGdCQUFZO0lBSTlDLE9BQU8sQ0FBQyxPQUEyQjtRQUMvQixJQUFJLE9BQU8sQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxPQUFPLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLENBQUMsSUFBa0I7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDZixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRLENBQUMsT0FBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxRQUFRLENBQUMsT0FBc0I7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJ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