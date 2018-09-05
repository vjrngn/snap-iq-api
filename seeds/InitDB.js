const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Test = require('../models/Test');
const fs = require('fs');

let initDbWithJSONData = function () {
    let fileList = ['computerScience.json', 'generalCategory.json', 'geography.json', 'mathematics.json', 'scienceAndNature.json', 'sports.json'];
    fileList.forEach(fileName => {
        let file = fs.readFileSync(__dirname + '/' + fileName);
        let data = JSON.parse(file);
        if (typeof data === 'object') {
            for (i in data) {
                Quiz.countDocuments((err, count) => {
                    if (count === 0) {
                        Quiz.create(data[i]);
                    }
                });
            }
        }
    })
}

let populateTests = function () {
    Test.countDocuments((err, count) => {
        if (count === 0) {
            let categories = ['General%20Knowledge', 'Science%3A%20Computers', 'Geography', 'Science%3A%20Mathematics', 'Science%20%26%20Nature', 'Sports'];
            categories.forEach(category => {
                Quiz.find({ category: category }, (err, quizzes) => {
                    var i, j, temparray, chunk = 10;
                    for (i = 0, j = quizzes.length; i < j; i += chunk) {
                        temparray = quizzes.slice(i, i + chunk);
                        Test.create({ category: decodeURIComponent(category), questionList: temparray });
                    }
                })
            });
        }
    })
}

module.exports = { initDbWithJSONData: initDbWithJSONData, populateTests: populateTests };