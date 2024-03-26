

const express = require('express');
const router = express.Router();
const Floor = require('../models/floor');





router.get('/', async (req, res) => {
    try {
        const floors = await Floor.find();
        res.json(floors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const floor = new Floor({
        floorNumber: req.body.floorNumber,
        tenants: [],
    });

    try {
        const newFloor = await floor.save();
        res.status(201).json(newFloor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:floorNumber', async (req, res) => {
    const floorNumber = req.params.floorNumber;

    try {
        const deletedFloor = await Floor.findOneAndDelete({ floorNumber });
        if (deletedFloor) {
            res.json(deletedFloor);
        } else {
            res.status(404).json({ message: 'Floor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:floorNumber', async (req, res) => {
    const floorNumber = req.params.floorNumber;

    try {
        const floor = await Floor.findOne({ floorNumber });
        if (floor) {
            res.json(floor);
        } else {
            res.status(404).json({ message: 'Floor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
