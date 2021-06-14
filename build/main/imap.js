"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imap_1 = __importDefault(require("imap"));
const util_1 = require("util");
class IMAP {
    connect(options) {
        this.imap = new imap_1.default({
            user: 'alnikitich@gmail.com',
            password: 'ng3-dcc25',
            host: 'imap.gmail.com',
            inbox: 'INBOX',
            port: 993,
            tls: true,
            keepalive: true,
            tlsOptions: { rejectUnauthorized: false }
        });
        const { imap } = this;
        imap.once('ready', function () {
            imap.on('mail', function (message) {
                console.log("message", message);
            });
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
            }
            openInbox(function (err, box) {
                if (err)
                    throw err;
                var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)', 'TEXT'] });
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
                            imap.addFlags(attrs.uid, "Deleted", (err, data) => {
                                console.log(err, data);
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
                    //   imap.end();
                });
            });
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
// const data = {
//     type: 'msg/system',
//     msg: IMessage | ISystem
//     from: 
//     to:
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLCtCQUErQjtBQUkvQixNQUFNLElBQUk7SUFHUixPQUFPLENBQUUsT0FBTztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUM7WUFDbkIsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixRQUFRLEVBQUUsV0FBVztZQUNyQixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLEdBQUc7WUFDVCxHQUFHLEVBQUUsSUFBSTtZQUNULFNBQVMsRUFBRSxJQUFJO1lBQ2YsVUFBVSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFO1NBQzFDLENBQUMsQ0FBQztRQUVILE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFFakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQTtZQUVGLFNBQVMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDO1lBRUQsU0FBUyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZCLElBQUksR0FBRztvQkFBRSxNQUFNLEdBQUcsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsc0JBQXNCLEVB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