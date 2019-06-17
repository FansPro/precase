import realm from "./index";

class ChatDao {
    static async saveChatList(chatInfo) {
        realm.write(() => {
            realm.create("ChatList", {...chatInfo}, true);
        });
    }

    static  saveMessage(name, info) {
        let chatList = realm.objects("ChatList");
        let chat = chatList.filtered(`name = "${name}"`);
        console.log("sdf", chatMessages, chat);
        let chatMessages = chat[0].messages;
        realm.write(() => {
            chatMessages.push(info);
        })

    }

    static  getMessages(name) {
        let chatList = realm.objects("ChatList");
        let chat = chatList.filtered(`name = "${name}"`);
        let chatMessages = chat[0].messages;
        return chatMessages;
    }

    static getAllChatList() {
        let result = realm.objects("ChatList");
        return result;
    }


    static deleteAll() {
        let chatList = realm.objects("ChatList");
        realm.write(() => {
            realm.delete(chatList)
        });
    }

    static deleteChatList(name) {
        let chat = realm.objects("ChatList").filtered(`name = "${name}"`);
        realm.write(() => {
            realm.delete(chat);
        })
        console.log("deleteItem", chat);

    }
}

export default ChatDao;