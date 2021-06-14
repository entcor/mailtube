"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("./index"));
const br = new index_1.default();
br.connect({
    imap: {
        boxName: 'INBOX',
        password: 'ng3-dcc25',
        user: 'alnikitich@gmail.com',
        keepalive: true,
        host: 'imap.gmail.com',
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
    },
    smtp: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'alnikitich@gmail.com',
            pass: 'ng3-dcc25',
        },
    }
});
br.send({
    type: index_1.DataType.MESSAGE,
    to: 'alnikitich@gmail.com',
    content: 'test content lkdj lgkdjgl kdjsg;lsjd lgd; foda; lfkj; lkjaf ;lkjs; f;s 1123',
    secret: '13123',
});
br.on('data', (data) => {
    console.log(">>>>", data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUErQztBQUUvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQVUsRUFBRSxDQUFDO0FBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDUCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsV0FBVztRQUNyQixJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixHQUFHLEVBQUUsSUFBSTtRQUNULFVBQVUsRUFBRSxFQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBQztLQUMxQztJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLEdBQUc7UUFDVCxNQUFNLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsSUFBSSxFQUFFLFdBQVc7U0FDbEI7S0FDSjtDQUNKLENBQUMsQ0FBQTtBQUVGLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDSixJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxPQUFPO0lBQ3RCLEVBQUUsRUFBRSxzQkFBc0I7SUFDMUIsT0FBTyxFQUFFLDZFQUE2RTtJQUN0RixNQUFNLEVBQUUsT0FBTztDQUNsQixDQUFDLENBQUE7QUFFRixFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDIn0=