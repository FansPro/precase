import Realm from "realm";

const ChatListSchema = {
    name: "ChatList",
    primaryKey: "name",
    properties: {
        name: "string",
        message: "string",
        unReadNum: "int",
        avatarPath: "string",
        timeStamp: "date",
        messages: "Message[]"
    }
}

const UserSchema = {
    name: "User",
    properties: {
        userId: "string?",
        displayName: "string",
        avatarPath: "string",
    }
}

const MessageSchema = {
    name: "Message",
    primaryKey: "id",
    properties: {
        owners: {type: 'linkingObjects', objectType: 'ChatList', property: 'messages'},
        fromUser: {type: "User"},
        van: 'User',
        mediaPath: "string?",
        voicePath: "string?",
        text: "string?",
        msgType: "string",
        id: "string",
        timeStamp: "date",
        duration: "int?",
    }
}

const schema = {schema: [ChatListSchema, MessageSchema, UserSchema], schemaVersion: 9 };

export default realm = new Realm(schema);