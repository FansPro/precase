import { client, xml, jid } from "@xmpp/client";

class XMPP {
    connect(opts) {
        const { username, password } = opts;
        let ws = new WebSocket("ws://testopenfire.winbox88.com:7070/ws/", "xmpp");
        ws.onopen = () => {
            console.log("open---");
        }
        this.xmpp = new client({
            service: "ws://testopenfire.winbox88.com:7070/ws",
            domain: "testopenfire.winbox88.com",
            resource: "precase",
            username: username,
            password: password,
        });
        this.xmpp.start();
    }

    sendMessage(message, user) {
        let msg = xml(
            "message",
            {type: "chat", to: user},
            xml("body", message),
        )
        this.xmpp.send(msg);
    }
    receiveMessage(callback) {
        this.xmpp.on('stanza', stanza => {
            if(stanza.is("message")) {
                let fromUser = stanza.attrs.from;
                let toUser = stanza.attrs.to;
                let message = stanza.getChild('body').attrs;
                callback(fromUser, toUser, message);
            }
        })
    }
    onStatus(callback) {
        this.xmpp.on('status', status => {
            callback(status);
        })
    }
}
export default new XMPP();