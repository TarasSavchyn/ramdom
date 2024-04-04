import React from 'react';
import AddressManager from './adresses/AddressManager';
import BankManager from "./banks/BankManager";

function App() {
    return (
        <div>
            <h1>Random Addresses</h1>
            <AddressManager/>
            <BankManager/>

        </div>
    );
}

export default App;
