const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    
    
    id: { type: String, requiired: true },
    description: { type: String, required: true },
    
    
    
});

module.exports = mongoose.model("feedback", feedbackSchema);
