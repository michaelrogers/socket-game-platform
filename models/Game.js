const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
        isCompleted: {
            type: Boolean,
            default: false,
        },
        player: [{
            type: Schema.Types.ObjectId,
            ref: "Player"
        }]
    }, {timestamps: true});

//TODO: Use method to update completed Status
gameSchema.static.completeGame = (gameid) => {
    return this.update({_id: gameid}, {$set: {isCompleted: true}});
}

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;