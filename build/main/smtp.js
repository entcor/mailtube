const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'alnikitich@gmail.com',
        pass: 'ng3-dcc25',
    },
});
transporter.sendMail({
    from: 'alnikitich@gmail.com',
    to: "alnikitich@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
}).then(console.log);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic210cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zbXRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV6QyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQ3pDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLEdBQUc7SUFDVCxNQUFNLEVBQUUsSUFBSTtJQUNaLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsSUFBSSxFQUFFLFdBQVc7S0FDbEI7Q0FDSixDQUFDLENBQUM7QUFFSCxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ2pCLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsRUFBRSxFQUFFLHNCQUFzQjtJQUMxQixPQUFPLEVBQUUsU0FBUztJQUNsQixJQUFJLEVBQUUsY0FBYztJQUNwQixJQUFJLEVBQUUscUJBQXFCO0NBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDIn0=