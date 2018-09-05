const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    test : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Test'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    points : Number
})

module.exports = mongoose.model('Solution',solutionSchema);