const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    depart: { type: String, required: true },
    arrive: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    seats: { type: Number, required: true },
    rating: { type: Number, required: true },
    amenities: [{ type: String }],
    type: { type: String, required: true },
    company: { type: String, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
