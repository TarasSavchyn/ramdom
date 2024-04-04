import React from 'react';

const BankList = ({banks, onEdit, onDelete}) => {
    return (
        <ul>
            {banks.map(bank => (
                <li key={bank.id}>
                    <strong>Name:</strong> {bank.name}<br/>
                    <strong>Rating:</strong> {bank.rating}<br/>
                    <strong>Address:</strong> {bank.address && `${bank.address.country}, ${bank.address.city}, ${bank.address.street}, ${bank.address.postal_code}`}<br/>
                    <button onClick={() => onEdit(bank)}>Edit</button>
                    <button onClick={() => onDelete(bank.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default BankList;
