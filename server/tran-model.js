var mongoose = require('mongoose');

// schema
var TranSchema = new mongoose.Schema({
    id: 'String',
    type: 'String',
    date: 'String',
    cat: 'String',
    amount: 'String'
});

module.exports = mongoose.model("my-trans", TranSchema);