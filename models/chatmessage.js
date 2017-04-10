const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessage = mongoose.model(
    'ChatMessage',
    new Schema({
        message: {
            type: String,
            required: [true, 'Must have a message']
        },
        player_Id: {
            type: String,
            required: [true, 'Must have a player_Id']
        },
        room_Id: {
            type: String,
            required: [true, 'Must have a room_Id']
        }
    }, {timestamps: true})
);
    
exports.module =  chatMessage;