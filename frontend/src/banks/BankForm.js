import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BankForm = ({bankData, onChange, onSubmit, onCancel}) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const addressesResponse = await axios.get('/api/randomium/addresses/');
                setAddresses(addressesResponse.data);
                setLoading(false); // Update loading state
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        }

        fetchAddresses();
    }, []);

    return (
        <div>
            <h2>{bankData.id ? 'Edit Bank' : 'Create New Bank'}</h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={bankData.name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Rating"
                name="rating"
                value={bankData.rating}
                onChange={onChange}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <label htmlFor="address">Address:</label>
                    <select id="address" name="address" value={bankData.address_id} onChange={onChange}>
                        <option value="">Select Address</option>
                        {addresses.map(address => (
                            <option key={address.id}
                                    value={address.id}>{`${address.country}, ${address.city}, ${address.street}, ${address.postal_code}`}</option>
                        ))}
                    </select>
                </>
            )}
            <button onClick={onSubmit}>{bankData.id ? 'Update' : 'Create'}</button>
            {bankData.id && <button onClick={onCancel}>Cancel</button>}
        </div>
    );
};

export default BankForm;
