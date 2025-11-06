import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';


// Reminder to adjust mock user data for API calls
export const Profile = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const [userData, setUserData] = useState(
        {
            name: "Satay Nadella",
            email: "satay.nadella@email.com",
            username: "SNadella",
            joinDate: "January 2024",
            totalInvested: "$12,450",
            portfolioValue: "$13,890",
            totalReturn: "+11.6%",
            activeInvestments: 8
        }
    )

    // // Mock user data
    // const userData = {
    //     name: "Satay Nadella",
    //     email: "satay.nadella@email.com",
    //     username: "SNadella",
    //     joinDate: "January 2024",
    //     totalInvested: "$12,450",
    //     portfolioValue: "$13,890",
    //     totalReturn: "+11.6%",
    //     activeInvestments: 8
    // };

    const investments = [
        {
            id: 1,
            name: "109 Linden Street, Brooklyn",
            category: "Real Estate",
            shares: 5,
            value: "$2300",
            return: "+8.3%",
            icon: "🏠"
        },
        {
            id: 2,
            name: "300 Linden Street, Brooklyn",
            category: "Real Estate",
            shares: 5,
            value: "$2300",
            return: "+8.3%",
            icon: "🏠"
        },
        {
            id: 3,
            name: "109 Linden Street, Brooklyn",
            category: "Real Estate",
            shares: 5,
            value: "$2300",
            return: "+8.3%",
            icon: "🏠"
        }
    ];

    const transactions = [
        {
            id: 1,
            type: "buy",
            asset: "109 Linden Street, Brooklyn",
            shares: 2,
            price: "2300",
            date: "Oct 15, 2025"
        },
        {
            id: 2,
            type: "buy",
            asset: "109 Linden Street, Brooklyn",
            shares: 2,
            price: "2300",
            date: "Oct 15, 2025"
        },
        {
            id: 3,
            type: "buy",
            asset: "109 Linden Street, Brooklyn",
            shares: 2,
            price: "2300",
            date: "Oct 15, 2025"
        }
    ];

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        console.log("profile useEffect")

        let jwt_token = Cookies.get('jwt_token')

        if (jwt_token) {

            (async () => {
                console.log("Token exists")
                const response = await axios.post('http://localhost:8000/auth/user_info', { "jwt_token": jwt_token });

                if (response.status === 200) {

                    const data = response.data

                    const dateObject = new Date(data["created_at"])

                    // Format as "Month Day, Year" (e.g., "November 5, 2025")
                    const formattedDate = dateObject.toLocaleDateString('en-US', {
                        month: 'long',
                        // day: 'numeric',
                        year: 'numeric',
                    });

                    console.log(formattedDate)

                    // console.log(response)

                    setUserData(userData => (
                        {
                            ...userData,
                            username: data["username"],
                            email: data["email"],
                            joinDate: formattedDate
                        }
                    ))

                    // console.log(response);
                }

                setIsLoggedIn(true)
            }
            )()
        }
        else {
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])


    return (
        <div className="profile-layout">
            <div className='profile-container'>
                {/* Sidebar */}
                <div className="profile-sidebar">
                    {/* User Profile Section */}
                    <div className="sidebar-header">
                        <div className="user-profile">
                            <div className="user-avatar">
                                {userData.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="user-info">
                                <div className="user-name-row">
                                    <h2 className="user-name">{userData.name}</h2>
                                    {userData.verified && (
                                        <svg className="verified-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" />
                                        </svg>
                                    )}
                                </div>
                                <p className="user-email">{userData.email}</p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="quick-stats">
                            <div className="quick-stat-card">
                                <div className="quick-stat-label">Portfolio</div>
                                <div className="quick-stat-value">{userData.portfolioValue}</div>
                            </div>
                            <div className="quick-stat-card">
                                <div className="quick-stat-label">Return</div>
                                <div className="quick-stat-value">{userData.totalReturn}</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="sidebar-nav">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
                        >
                            📊 Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('investments')}
                            className={`nav-button ${activeTab === 'investments' ? 'active' : ''}`}
                        >
                            💼 My Investments
                        </button>
                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`nav-button ${activeTab === 'transactions' ? 'active' : ''}`}
                        >
                            📜 Transactions
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
                        >
                            ⚙️ Settings
                        </button>
                    </nav>

                    {/* Footer */}
                    <div className="sidebar-footer">
                        <p>Member since {userData.joinDate}</p>
                    </div>
                </div>
            </div>
            {/* Main Content Area */}
            <div className="profile-content">
                <div className="content-wrapper">
                    {activeTab === 'overview' && (
                        <div>
                            <h1 className="page-title">Portfolio Overview</h1>

                            {/* Stats Grid */}
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <div className="stat-box-label">Total Invested</div>
                                    <div className="stat-box-value">{userData.totalInvested}</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-label">Portfolio Value</div>
                                    <div className="stat-box-value">{userData.portfolioValue}</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-label">Total Return</div>
                                    <div className="stat-box-value positive">{userData.totalReturn}</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-box-label">Active Investments</div>
                                    <div className="stat-box-value">{userData.activeInvestments}</div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="content-grid">
                                {/* Recent Activity */}
                                <div className="content-card">
                                    <h2 className="card-title">Recent Activity</h2>
                                    <div className="activity-list">
                                        {transactions.slice(0, 3).map(tx => (
                                            <div key={tx.id} className="activity-item">
                                                <div className={`activity-badge ${tx.type}`}>
                                                    {tx.type === 'buy' ? '↑' : '↓'}
                                                </div>
                                                <div className="activity-details">
                                                    <div className="activity-name">{tx.asset}</div>
                                                    <div className="activity-date">{tx.date}</div>
                                                </div>
                                                <div className="activity-amount">
                                                    {tx.type === 'buy' ? '-' : '+'}{tx.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Top Performers */}
                                <div className="content-card">
                                    <h2 className="card-title">Top Performers</h2>
                                    <div className="performer-list">
                                        {investments.sort((a, b) => parseFloat(b.return) - parseFloat(a.return)).map(inv => (
                                            <div key={inv.id} className="performer-item">
                                                <div className="performer-icon">{inv.icon}</div>
                                                <div className="performer-details">
                                                    <div className="performer-name">{inv.name}</div>
                                                    <div className="performer-category">{inv.category}</div>
                                                </div>
                                                <div className="performer-return">{inv.return}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'investments' && (
                        <div>
                            <h1 className="page-title">My Investments</h1>
                            <div className="investments-list">
                                {investments.map(investment => (
                                    <div key={investment.id} className="investment-row">
                                        <div className="investment-icon-box">
                                            {investment.icon}
                                        </div>
                                        <div className="investment-info">
                                            <h3 className="investment-name">{investment.name}</h3>
                                            <p className="investment-category">{investment.category}</p>
                                        </div>
                                        <div className="investment-stat-item">
                                            <div className="investment-stat-label">Shares</div>
                                            <div className="investment-stat-value">{investment.shares}</div>
                                        </div>
                                        <div className="investment-stat-item">
                                            <div className="investment-stat-label">Value</div>
                                            <div className="investment-stat-value">{investment.value}</div>
                                        </div>
                                        <div className="investment-stat-item">
                                            <div className="investment-stat-label">Return</div>
                                            <div className="investment-stat-value positive">{investment.return}</div>
                                        </div>
                                        <button className="manage-button">Manage</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div>
                            <h1 className="page-title">Transaction History</h1>
                            <div className="transactions-table">
                                <div className="table-header-row">
                                    <div>Type</div>
                                    <div className="col-span-2">Asset</div>
                                    <div>Amount</div>
                                    <div>Date</div>
                                </div>
                                {transactions.map(tx => (
                                    <div key={tx.id} className="table-data-row">
                                        <div>
                                            <span className={`transaction-type-badge ${tx.type}`}>
                                                {tx.type.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="col-span-2 transaction-asset">{tx.asset}</div>
                                        <div className="transaction-amount">{tx.shares} × {tx.price}</div>
                                        <div className="transaction-date">{tx.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Adjust this function */}
                    {activeTab === 'settings' && (
                        <div>
                            <h1 className="page-title">Account Settings</h1>
                            <div className="settings-sections">
                                {/* Personal Information */}
                                <div className="settings-card">
                                    <h2 className="settings-card-title">Personal Information</h2>
                                    <div className="form-fields">
                                        <div className="form-field">
                                            <label className="field-label">Username</label>
                                            <input
                                                type="text"
                                                value={userData.username}
                                                readOnly
                                                className="field-input"
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="field-label">Full Name</label>
                                            <input
                                                type="text"
                                                value={userData.name}
                                                readOnly
                                                className="field-input"
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="field-label">Email Address</label>
                                            <input
                                                type="email"
                                                value={userData.email}
                                                readOnly
                                                className="field-input"
                                            />
                                        </div>
                                        <button className="update-button">Update Information</button>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="settings-card">
                                    <h2 className="settings-card-title">Security</h2>
                                    <div className="security-options">
                                        <div className="security-option">
                                            <div className="security-option-info">
                                                <h3 className="security-option-title">Change Password</h3>
                                                <p className="security-option-desc">Update your password regularly</p>
                                            </div>
                                            <button className="security-button">Change</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;