const mongoose = require('mongoose');
const Quiz = require('./Quiz');

const testSchema = new mongoose.Schema({
    categoryID : Number,
    questionList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Quiz"
        }
    ]
});

module.exports = mongoose.model('Test', testSchema);