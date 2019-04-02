import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="text-center font-italic" style={{ marginTop: '200px' }}>
        <h2 >Page Not Found</h2>
        <p>Please come back to <Link to="/user">User</Link> or <Link to="/admin">Admin</Link></p>
    </div>
);

export default NotFound;
