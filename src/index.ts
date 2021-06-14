import Imap, { Config as IMAPOptions} from 'imap';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import EventEmitter from 'events';

export interface ExIMAPOptions extends IMAPOptions {
    boxName: string;
};

export interface IConnectionOptions {
    imap?: ExIMAPOptions,
    smtp?: any,
};

export enum DataType { MESSAGE = 'message', SYSTEM = 'system' }; 

export interface IDataContent {
    type: DataType,
    to: string,
    content: string,
    secret: string,
}

export default class MailTube extends EventEmitter {
    imap: Imap;
    smtp: Transporter<SMTPTransport.SentMessageInfo>

    connect(options: IConnectionOptions) {
        if (options.imap) this.initIMAP(options.imap);
        if (options.smtp) this.initSMTP(options.smtp);
    }

    send(data: IDataContent) {
        this.smtp.sendMail({
            to: data.to,
            subject: `${data.type}:${data.secret}`,
            text: data.content
        }).then(console.log);
    }

    initSMTP(options: any): void {
        this.smtp = nodemailer.createTransport(options);
    }

    initIMAP(options: ExIMAPOptions) {
        this.imap = new Imap({...{
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
                if (err) throw err;
                box = _box;
                
                imap.on('mail', (count: number) => {
                    readMail(count);
                });
            });

            const readMail = (count: number) => {
                var f = imap.seq.fetch((box.messages.total - count + 1) + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
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
                            imap.addFlags(attrs.uid, "Deleted" , (err: Error): void => {
                                if (err) console.error(err)
                            });
                        },100)
                    });
                    msg.once('end', () => {
                        this.emit('data', {
                            seqno: seqno,
                            res,
                        })
                    });
                });
                f.once('error', (err) => {
                    console.log('Fetch error: ' + err);
                });
                f.once('end', () => {
                    // Done fetching all messages
                });
            }
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
