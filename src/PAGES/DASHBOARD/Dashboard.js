import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content pl-4">
                {/* Page content here */}
                <h1 className='stat-value text-blue-500'>DASHBOARD</h1>
                <h3 className='text-purple-500'>Welcome to your Dashboard</h3>
                {/*Render Nested Routes*/}
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="dashboard-sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 text-base-content bg-primary">
                    {/* Sidebar content here */}
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/dashboard/review">My Review</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>
                    <li><Link to="/dashboard/users">All Users</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;