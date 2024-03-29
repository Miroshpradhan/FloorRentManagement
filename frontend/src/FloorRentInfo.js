import React, { useState } from 'react';
import './floor.css';

const FloorRentInfo = ({ floorDetails, onRemoveTenant, onClose, onUpdateTenant,tenants, setTenants }) => {
    const { id, name, electricity, water, internet, others, paid } = floorDetails;
    const [newPaidAmount, setNewPaidAmount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const totalRent = electricity + water + internet + others;
    const remainingAmount = totalRent - paid;

    const handlePaidAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === '') {
            setNewPaidAmount(parseInt(value, 10));
        }
    };

    const handleUpdatePaidAmount = () => {
        const updatedTenant = {
            ...floorDetails,
            paid: paid + newPaidAmount,
        };
        onUpdateTenant(updatedTenant);
        setNewPaidAmount(0);
    };

    const handleRemoveTenant = async () => {
        setShowConfirmation(true);
    };
    
    const confirmRemoveTenant = async () => {
        try {
            const response = await fetch(`http://localhost:5000/tenants/${floorDetails.customId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
             
                await fetch(`http://localhost:5000/tenants/update-customIds`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ removedCustomId: floorDetails.customId }),
                });
                setTenants((prevTenants) => prevTenants.filter((tenant) => tenant.customId !== floorDetails.customId));
                onRemoveTenant(floorDetails.customId);
            } else {
                console.error('Failed while trying to remove tenant');
            }
        } catch (error) {
            console.error('Failed while trying to remove tenant:', error);
        }
        setShowConfirmation(false);
    };
    
    return (
        <div className="rent-info-container show">
            <div className="user-info">
                <h3 className="user-name">Tenant's Name<br /> {name}</h3>
            </div>
            <div className="bill-info">
                <div className="total-paid">
                    <div>
                        <h3>Total: {totalRent}</h3>
                        <h3>Paid: {paid}</h3>
                        <h3>Remaining Amount: {remainingAmount}</h3>
                    </div>
                </div>
                <div className="monthly-bill">
                    <h3>Monthly Bill Detail</h3>
                    <div>
                        <h4>Electricity: {electricity}</h4>
                        <h4>Water: {water}</h4>
                        <h4>Internet: {internet}</h4>
                        <h4>Floor/Room's  Rent: {others}</h4>
                    </div>
                </div>
                <div className="edit-paid">
                    <input
                        type="number"
                        placeholder="Enter new paid amount"
                        value={newPaidAmount}
                        onChange={handlePaidAmountChange}
                    />
                    <button onClick={handleUpdatePaidAmount}>Update Paid</button>
                </div>
            </div>
            <div>
                <button onClick={handleRemoveTenant}>
                    Remove Tenant
                </button>
                <button onClick={onClose}>Close</button>
            </div>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to remove {name}?</p>
                    <button onClick={confirmRemoveTenant}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default FloorRentInfo;
