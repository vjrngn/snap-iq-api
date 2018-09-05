const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    category : String,
    type : String,
    correct_answer : String,
    difficulty : String,
    incorrect_answers : Array,
    question : String
});

module.exports = mongoose.model("Quiz", quizSchema);