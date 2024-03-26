import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TenantForm from './TenantForm';
import FloorRentInfo from './FloorRentInfo';
import './floor.css';

const FloorDetails = ({ selectedFloor }) => {
    const [floorDetails, setFloorDetails] = useState(null);
    const [tenants, setTenants] = useState([]);
    const [selectedTenantId, setSelectedTenantId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/tenants/${selectedFloor}`);
            if (response.ok) {
                const floorTenants = await response.json();
                localStorage.setItem('tenants', JSON.stringify(floorTenants));
                setTenants(floorTenants);
            } else {
                console.error('Failed to fetch floor details');
            }
        };
    
        if (selectedFloor) {
            fetchData();
        }
    }, [selectedFloor]);
    
    useEffect(() => {
        const storedTenants = localStorage.getItem('tenants');
        if (storedTenants) {
            setTenants(JSON.parse(storedTenants));
        }
    }, []);

    // To Store selected floor
    useEffect(() => {
        localStorage.setItem('selectedFloor', selectedFloor);
    }, [selectedFloor]);
    
    
    useEffect(() => {
        const storedTenants = localStorage.getItem('tenants');
        if (storedTenants) {
            setTenants(JSON.parse(storedTenants));
        }
    }, []);

    const addTenant = async (tenantData) => {
        try {
            const response = await fetch(`http://localhost:5000/tenants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...tenantData, floorNumber: selectedFloor }),
            });
            if (response.ok) {
                const newTenant = await response.json();
                setTenants([...tenants, newTenant]);
            } else {
                console.error('Failed to add tenant');
            }
        } catch (error) {
            console.error('Failed to add tenant:', error);
        }
    };

    const removeTenant = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tenants/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTenants(tenants.filter((tenant) => tenant._id !== id));
            } else {
                console.error('Failed to remove tenant');
            }
        } catch (error) {
            console.error('Failed to remove tenant:', error);
        }
    };

    const updateTenant = async (updatedTenant) => {
        try {
            const response = await fetch(`http://localhost:5000/tenants/${updatedTenant._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTenant),
            });
            if (response.ok) {
                setTenants(tenants.map((tenant) => (tenant._id === updatedTenant._id ? updatedTenant : tenant)));
            } else {
                console.error('Failed to update tenant');
            }
        } catch (error) {
            console.error('Failed to update tenant:', error);
        }
    };
    const updateTenantInFloorDetails = (updatedTenant) => {
        setTenants(tenants.map((tenant) => (tenant._id === updatedTenant._id ? updatedTenant : tenant)));
    };
    const handleShowRentInfo = (id) => {
        setSelectedTenantId(id);
    };

    return (
        <div>
            <h1>Floor {selectedFloor} Details</h1>
            <Link to="/"><div className="Link">Back</div></Link>
            <TenantForm onAddTenant={addTenant} />
            {tenants.length > 0 ? (
                tenants.map((tenant) => (
                    <div key={tenant._id}>
                        <h3>{tenant.name}</h3>
                        <button onClick={() => handleShowRentInfo(tenant._id)}>Floor Rent Info</button>
                        {selectedTenantId === tenant._id && (
                            <FloorRentInfo
                                floorDetails={tenant}
                                onRemoveTenant={removeTenant}
                                onClose={() => setSelectedTenantId(null)}
                                onUpdateTenant={updateTenant}
                                tenants={tenants}
                                setTenants={setTenants}
                            />
                        )}
                    </div>
                ))
            ) : (
                <p>No tenants added yet.</p>
            )}
        </div>
    );
};

export default FloorDetails;
