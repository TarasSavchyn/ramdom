import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import ExportAddresses from "../export_csv/ExportAddresses";

const AddressManager = () => {
    const [addresses, setAddresses] = useState([]);
    const [editAddressData, setEditAddressData] = useState({});
    const [editAddressId, setEditAddressId] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await axios.get('http://localhost:8080/api/randomium/addresses/');
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        }

        fetchAddresses();
    }, []);

    const handleEditChange = e => {
        const {name, value} = e.target;
        setEditAddressData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditAddressId(null);
        setEditAddressData({});
        setEditing(false);
    };

    const handleEditAddress = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/randomium/addresses/${editAddressId}/`, editAddressData);
            const updatedAddresses = addresses.map(address =>
                address.id === editAddressId ? response.data : address
            );
            setAddresses(updatedAddresses);
            handleCancelEdit();
        } catch (error) {
            console.error(`Error editing address with ID ${editAddressId}:`, error);
        }
    };

    const handleCreateAddress = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/randomium/addresses/', editAddressData);
            setAddresses([...addresses, response.data]);
            setEditAddressData({
                country: '',
                city: '',
                street: '',
                postal_code: ''
            });
        } catch (error) {
            console.error('Error creating address:', error);
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
            <AddressForm
                addressData={editing ? editAddressData : {country: '', city: '', street: '', postal_code: ''}}
                onChange={handleEditChange}
                onSubmit={editing ? handleEditAddress : handleCreateAddress}
                onCancel={handleCancelEdit}
            />
            <AddressList addresses={addresses} onEdit={address => {
                setEditAddressData(address);
                setEditAddressId(address.id);
                setEditing(true);
            }} onDelete={handleDeleteAddress}/>
            <ExportAddresses/>
        </div>
    );
};

export default AddressManager;
