import Realm from "realm";

class ChatList extends Realm.object {
    name: "chatList"
    primaryKey: "id"
    properties: {
        id; 'int'
        name: 'string',
        message: 'string?'
        unRead: 'int'
    }

}

export default ChatList;