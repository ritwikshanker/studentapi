const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
var Students = mongoose.model('Student', studentSchema);

module.exports = Students;