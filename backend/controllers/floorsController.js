
const Floor = require('../models/floor');
const addTenantToFloor = async (floorId, tenantId) => {
    try {
        const floor = await Floor.findById(floorId);
        if (!floor) {
            throw new Error('Floor not found');
        }

        floor.tenants.push(tenantId);
        await floor.save();
        console.log('Tenant added to floor:', floor);
    } catch (error) {
        console.error('Failed to add tenant to floor:', error);
    }
};

const removeTenantFromFloor = async (floorId, tenantId) => {
    try {
        const floor = await Floor.findById(floorId);
        if (!floor) {
            throw new Error('Floor not found');
        }

        floor.tenants.pull(tenantId);
        await floor.save();
        console.log('Tenant removed from floor:', floor);
    } catch (error) {
        console.error('Failed to remove tenant from floor:', error);
    }
};
module.exports = {
    addTenantToFloor,
    removeTenantFromFloor,
};
