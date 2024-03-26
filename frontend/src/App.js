import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FloorDetails from './FloorDetails';
import './App.css';

const App = () => {
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [numFloors, setNumFloors] = useState(0);
    
    const [tenants, setTenants] = useState([]);
    useEffect(() => {
        const fetchNumFloors = async () => {
            try {
                const response = await fetch('http://localhost:5000/floors');
                if (response.ok) {
                    const floors = await response.json();
                    setNumFloors(floors.length);
                } else {
                    console.error('Failed to fetch number of floors');
                }
            } catch (error) {
                console.error('Failed to fetch number of floors:', error);
            }
        };

        fetchNumFloors();
    }, []);

    const addFloor = async () => {
        try {
            const response = await fetch('http://localhost:5000/floors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    floorNumber: numFloors + 1,
                }),
            });

            if (response.ok) {
                setNumFloors(numFloors + 1);
            } else {
                console.error('Failed to add floor');
            }
        } catch (error) {
            console.error('Failed to add floor:', error);
        }
    };

    const removeFloor = async () => {
        if (numFloors > 0) {
            try {
                const response = await fetch(`http://localhost:5000/floors/${numFloors}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setNumFloors(numFloors - 1);
                    setSelectedFloor(null);
                } else {
                    console.error('Failed to remove floor');
                }
            } catch (error) {
                console.error('Failed to remove floor:', error);
            }
        }
    };

    const handleFloorClick = (floor) => {
        setSelectedFloor(floor);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route
                            path="/floor/:floorNumber"
                            element={
                                <FloorDetails
                                    selectedFloor={selectedFloor}
                                    tenants={tenants}
                                    setTenants={setTenants}
                                />
                            }
                        />
                        <Route path="/" element={<div className="floors">
                            <button className="b1" onClick={addFloor}>Add Floor</button>
                            {numFloors === 0 && <p>No floors yet. Click 'Add Floor' to start.</p>}
                            {numFloors > 0 && <button className="b1" onClick={removeFloor}>Remove Floor</button>}
                            <h1>Welcome to Floor Record Keeper</h1>
                            {[...Array(numFloors)].map((_, index) => (
                                <Link key={index} to={`/floor/${index + 1}`} onClick={() => handleFloorClick(index + 1)}>Floor {index + 1}</Link>
                            ))}
                        </div>} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
};

export default App;
