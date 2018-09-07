const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    category : String,
    questionList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Quiz"
        }
    ]
});

module.exports = mongoose.model('Test', testSchema);