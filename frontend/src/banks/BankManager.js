// BankManager.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BankForm from './BankForm';
import BankList from './BankList';
import ExportBank from "../export_csv/ExportBank";

const BankManager = () => {
    const [banks, setBanks] = useState([]);
    const [editBankData, setEditBankData] = useState({});
    const [editBankId, setEditBankId] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function fetchBanks() {
            try {
                const response = await axios.get('http://localhost:8080/api/randomium/banks/');
                setBanks(response.data);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        }

        fetchBanks();
    }, []);

    const handleEditChange = e => {
        const {name, value} = e.target;
        setEditBankData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditBankId(null);
        setEditBankData({});
        setEditing(false);
    };

    const handleEditBank = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/randomium/banks/${editBankId}/`, editBankData);
            const updatedBanks = banks.map(bank =>
                bank.id === editBankId ? response.data : bank
            );
            setBanks(updatedBanks);
            handleCancelEdit();
        } catch (error) {
            console.error(`Error editing bank with ID ${editBankId}:`, error);
        }
    };

    const handleCreateBank = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/randomium/banks/', editBankData);
            setBanks([...banks, response.data]);
            setEditBankData({
                name: '',
                rating: ''
                // You can add other fields here if needed
            });
        } catch (error) {
            console.error('Error creating bank:', error);
        }
    };

    const handleDeleteBank = async id => {
        try {
            await axios.delete(`/api/randomium/banks/${id}/`);
            const updatedBanks = banks.filter(bank => bank.id !== id);
            setBanks(updatedBanks);
        } catch (error) {
            console.error(`Error deleting bank with ID ${id}:`, error);
        }
    };

    return (
        <div>
            <BankForm
                bankData={editing ? editBankData : {name: '', rating: ''}}
                onChange={handleEditChange}
                onSubmit={editing ? handleEditBank : handleCreateBank}
                onCancel={handleCancelEdit}
            />
            <BankList banks={banks} onEdit={bank => {
                setEditBankData(bank);
                setEditBankId(bank.id);
                setEditing(true);
            }} onDelete={handleDeleteBank}/>
            <ExportBank/>
        </div>
    );
};

export default BankManager;
