import React from 'react';
import axios from 'axios';

class ExportAddresses extends React.Component {
    constructor(props) {
        super(props);
        this.handleExport = this.handleExport.bind(this);
    }

    handleExport() {
        axios.get('api/randomium/export-addresses/', {responseType: 'blob'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'addresses.csv');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('Error exporting data:', error);
            });
    }

    render() {
        return (
            <button onClick={this.handleExport}>Export Addresses data to .csv file</button>
        );
    }
}

export default ExportAddresses;
