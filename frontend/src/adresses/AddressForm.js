import React from 'react';

const AddressForm = ({addressData, onChange, onSubmit, onCancel}) => {
    return (
        <div>
            <h2>{addressData.id ? 'Edit Address' : 'Create New Address'}</h2>
            <input
                type="text"
                placeholder="Country"
                name="country"
                value={addressData.country}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="City"
                name="city"
                value={addressData.city}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Street"
                name="street"
                value={addressData.street}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={addressData.postal_code}
                onChange={onChange}
            />
            <button onClick={onSubmit}>{addressData.id ? 'Update' : 'Create'}</button>
            {addressData.id && <button onClick={onCancel}>Cancel</button>}
        </div>
    );
};

export default AddressForm;
