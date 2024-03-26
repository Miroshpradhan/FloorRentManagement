const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const tenantSchema = new mongoose.Schema({
    customId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    floorNumber: {
        type: Number,
        required: true,
    },
    electricity: {
        type: Number,
        default: 0,
    },
    water: {
        type: Number,
        default: 0,
    },
    internet: {
        type: Number,
        default: 0,
    },
    others: {
        type: Number,
        default: 0,
    },
    paid: {
        type: Number,
        default: 0,
    },
});

tenantSchema.plugin(AutoIncrement, { inc_field: 'customId' });

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
