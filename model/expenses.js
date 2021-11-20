const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.Schema('expense', expensesSchema);