const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    category : String,
    correct_answer : String,
    options : Object,
    question : String
});

module.exports = mongoose.model("Quiz", quizSchema);