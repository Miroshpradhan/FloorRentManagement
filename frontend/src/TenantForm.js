// TenantForm.js
import React, { useState } from 'react';
import "./teenant.css";
const TenantForm = ({ onAddTenant }) => {
  const [name, setName] = useState('');
  const [electricity, setElectricity] = useState();
  const [water, setWater] = useState();
  const [internet, setInternet] = useState();
  const [others, setOthers] = useState();
  const [paid, setPaid] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTenant({
      id: Math.random().toString(),
      name,
      electricity,
      water,
      internet,
      others,
      paid,
    });
    setName('');
    setElectricity();
    setWater();
    setInternet();
    setOthers();
    setPaid();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'electricity':
        setElectricity(parseFloat(value));
        break;
      case 'water':
        setWater(parseFloat(value));
        break;
      case 'internet':
        setInternet(parseFloat(value));
        break;
      case 'others':
        setOthers(parseFloat(value));
        break;
      case 'paid':
        setPaid(parseFloat(value));
        break;
      default:
        break;
    }
  };
  
  return (
 
    <form onSubmit={handleSubmit} className="TenantForm">
      <input
        type="text"
        name="name"
        placeholder="Tenant Name"
        value={name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="electricity"
        placeholder="Electricity"
        value={electricity}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="water"
        placeholder="Water"
        value={water}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="internet"
        placeholder="Internet"
        value={internet}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="others"
        placeholder="Others"
        value={others}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="paid"
        placeholder="Paid"
        value={paid}
        onChange={handleInputChange}
      />
      <button type="submit">Add Tenant</button>
    </form>
  );
};

export default TenantForm;
