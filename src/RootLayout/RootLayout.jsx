import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <h1>navbar</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;