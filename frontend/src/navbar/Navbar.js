import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/banks">Banks</Link>
                </li>
                <li>
                    <Link to="/addresses">Addresses</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;