const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

const messageSchema = new Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: String },
    receiver: { type: String },
    message: [
        {
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            senderName: { type: String },
            receiverName: { type: String },
            body: { type: String, default: '' },
            isRead: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now() }
        }
    ]
});

module.exports = mongoose.model('Message', messageSchema);