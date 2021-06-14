import MailBridge, { DataType } from './index'; 

const br = new MailBridge();
br.connect({
    imap: {
        boxName: 'INBOX',
        password: 'ng3-dcc25',
        user: 'alnikitich@gmail.com',
        keepalive: true,
        host: 'imap.gmail.com',
        tls: true,
        tlsOptions: {rejectUnauthorized: false}
    },
    smtp: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'alnikitich@gmail.com', // generated ethereal user
          pass: 'ng3-dcc25', // generated ethereal password
        },
    }
})

br.send({
    type: DataType.MESSAGE,
    to: 'alnikitich@gmail.com',
    content: 'test content lkdj lgkdjgl kdjsg;lsjd lgd; foda; lfkj; lkjaf ;lkjs; f;s 1123',
    secret: '13123',
})

br.on('data', (data) => {
    console.log(">>>>", data);
});

