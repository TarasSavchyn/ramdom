import React from 'react';

const AddressList = ({addresses, onEdit, onDelete}) => {
    return (
        <ul>
            {addresses.map(address => (
                <li key={address.id}>
                    <strong>Country:</strong> {address.country}<br/>
                    <strong>City:</strong> {address.city}<br/>
                    <strong>Street:</strong> {address.street}<br/>
                    <strong>Postal Code:</strong> {address.postal_code}<br/>
                    <button onClick={() => onEdit(address)}>Edit</button>
                    <button onClick={() => onDelete(address.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default AddressList;
