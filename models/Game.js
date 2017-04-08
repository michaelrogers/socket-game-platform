import { mongoose, Schema } from "mongoose";

// const Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Game",
    new Schema({
        comment: {
            type: String,
            required: ['You must input a comment.']
        }
    })
);