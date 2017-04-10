const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Player = mongoose.model(
    "Player",
    new Schema({
        name: {
            type: String,
            required: true
        }
    }, {timestamps: true})
);

module.exports = Player;