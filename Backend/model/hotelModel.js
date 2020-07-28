const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    
    
    //id: { type: String, requiired: true },
    //placeType: {type: String, required: true},
    title: { type: String, required: true },
    singleRoom: { type: Number, required: true},
    doubleRoom: { type: Number, required: true},
    image: { type: String, required: true},
    // amount: {type: String, required: true},
    //season: {type: [String], required: true},
    //latitude: {type: String, required: true},
    //longitude: {type: String, required: true},
    city: {type: String, required: true},
    
});

module.exports = mongoose.model("Hotel", hotelSchema);
