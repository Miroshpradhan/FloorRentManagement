const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    floorNumber: {
        type: Number,
        required: true,
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
    }],
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
