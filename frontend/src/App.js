import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        country: '',
        city: '',
        street: '',
        postal_code: ''
    });
    const [editAddressData, setEditAddressData] = useState({});
    const [editAddressId, setEditAddressId] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await axios.get('/api/randomium/addresses/');
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        }

        fetchAddresses();
    }, []);

    const handleCreateAddress = async () => {
        try {
            const response = await axios.post('/api/randomium/addresses/', newAddress);
            setAddresses([...addresses, response.data]);
            setNewAddress({
                country: '',
                city: '',
                street: '',
                postal_code: ''
            });
        } catch (error) {
            console.error('Error creating address:', error);
        }
    };

    const handleEditChange = e => {
        const {name, value} = e.target;
        setEditAddressData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditAddress = async () => {
        try {
            const response = await axios.put(`/api/randomium/addresses/${editAddressId}/`, editAddressData);
            const updatedAddresses = addresses.map(address =>
                address.id === editAddressId ? response.data : address
            );
            setAddresses(updatedAddresses);
            setEditAddressId(null);
            setEditAddressData({});
            setEditing(false);
        } catch (error) {
            console.error(`Error editing address with ID ${editAddressId}:`, error);
        }
    };

    const handleDeleteAddress = async id => {
        try {
            await axios.delete(`/api/randomium/addresses/${id}/`);
            const updatedAddresses = addresses.filter(address => address.id !== id);
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error(`Error deleting address with ID ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>Random Addresses</h1>
            <div>
                <h2>{editAddressId ? 'Edit Address' : 'Create New Address'}</h2>
                <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={editAddressData.country || newAddress.country}
                    onChange={handleEditChange}
                />
                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={editAddressData.city || newAddress.city}
                    onChange={handleEditChange}
                />
                <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={editAddressData.street || newAddress.street}
                    onChange={handleEditChange}
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={editAddressData.postal_code || newAddress.postal_code}
                    onChange={handleEditChange}
                />
                <button onClick={editAddressId ? handleEditAddress : handleCreateAddress}>
                    {editAddressId ? 'Update' : 'Create'}
                </button>
                {editAddressId && <button onClick={() => {
                    setEditAddressId(null);
                    setEditAddressData({});
                    setEditing(false);
                }}>Cancel</button>}
            </div>
            <ul>
                {addresses.map(address => (
                    <li key={address.id}>
                        <strong>Country:</strong> {address.country}<br/>
                        <strong>City:</strong> {address.city}<br/>
                        <strong>Street:</strong> {address.street}<br/>
                        <strong>Postal Code:</strong> {address.postal_code}<br/>
                        <button onClick={() => {
                            setEditAddressData(address);
                            setEditAddressId(address.id);
                            setEditing(true);
                        }}>Edit
                        </button>
                        <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
