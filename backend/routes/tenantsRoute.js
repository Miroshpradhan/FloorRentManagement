const express = require('express');
const router = express.Router();
const Tenant = require('../models/tenant');

router.get('/:floorNumber', async (req, res) => {
    try {
        const floorNumber = req.params.floorNumber;
        const tenants = await Tenant.find({ floorNumber: parseInt(floorNumber) }); // Convert floorNumber to integer
        res.json(tenants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, floorNumber, electricity, water, internet, others, paid } = req.body;
        const newTenant = new Tenant({ name, floorNumber, electricity, water, internet, others, paid });
        await newTenant.save();
        res.json(newTenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, floorNumber, electricity, water, internet, others, paid } = req.body;
        const updatedTenant = { name, floorNumber, electricity, water, internet, others, paid };
        const tenant = await Tenant.findByIdAndUpdate(req.params.id, updatedTenant, { new: true });
        res.json(tenant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:customId', async (req, res) => {
    try {
        const customId = req.params.customId;
        console.log(`Attempting to remove tenant with customId: ${customId}`);
        
        await Tenant.findOneAndDelete({ customId: customId });
        res.json({ msg: 'Tenant removed' });
    } catch (err) {
        console.error(`Failed to remove tenant: ${err.message}`);
        res.status(500).send('Server Error');
    }
});


router.put('/', async (req, res) => {
    try {
        const { removedCustomId } = req.body;

            const tenantsToUpdate = await Tenant.find({ customId: { $gt: removedCustomId } });


        await Promise.all(tenantsToUpdate.map(async (tenant) => {
            tenant.customId -= 1;
            await tenant.save();
        }));

        res.status(200).json({ message: 'CustomIds update successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
