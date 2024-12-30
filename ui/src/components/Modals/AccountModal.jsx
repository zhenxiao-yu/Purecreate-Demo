import React, { useState } from 'react';
import {FaCreditCard, FaPaypal} from "react-icons/fa";

// Mock Data
const mockUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subscription: 'Premium',
    joinedDate: 'January 15, 2023',
    avatar: 'https://via.placeholder.com/100',
    pureCreateId: 'PC-12345',
    phone: '+1 123-456-7890',
    address: '123 Main Street, Anytown, USA',
    accountStatus: 'Active',
    socialMedia: {
        twitter: '@johndoe',
        linkedin: '/in/johndoe',
        github: 'github.com/johndoe',
    },
    preferences: {
        darkMode: true,
        language: 'English',
        emailNotifications: true,
    },
    activityLog: [
        'Logged in on December 25, 2024',
        'Updated profile on December 20, 2024',
        'Changed password on December 15, 2024',
    ],
    achievements: ['Completed 100 Tasks', '5-Year Member', 'Top Contributor of 2023'],
    paymentMethods: ['Visa **** 1234', 'PayPal john.doe@example.com'],
};

const AccountModal = () => {
    const [formData, setFormData] = useState({
        name: mockUserData.name,
        email: mockUserData.email,
        phone: mockUserData.phone,
        address: mockUserData.address,
        language: mockUserData.preferences.language,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Account details updated:\n${JSON.stringify(formData, null, 2)}`);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-8">
            {/* Header Section */}
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={mockUserData.avatar}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
                />
                <h2 className="text-3xl font-bold text-gray-800">{mockUserData.name}</h2>
                <p className="text-gray-500">{mockUserData.email}</p>
                <button className="text-blue-500 font-medium hover:underline">Change Avatar</button>
            </div>

            {/* User Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                    <p><strong>Subscription:</strong> {mockUserData.subscription}</p>
                    <p><strong>Joined:</strong> {mockUserData.joinedDate}</p>
                </div>
                <div>
                    <p><strong>Phone:</strong> {mockUserData.phone}</p>
                    <p><strong>Address:</strong> {mockUserData.address}</p>
                </div>
                <div>
                    <p><strong>PureCreate ID:</strong> {mockUserData.pureCreateId}</p>
                    <p><strong>Status:</strong> {mockUserData.accountStatus}</p>
                </div>
                <div>
                    <p><strong>Twitter:</strong> {mockUserData.socialMedia.twitter}</p>
                    <p><strong>LinkedIn:</strong> {mockUserData.socialMedia.linkedin}</p>
                    <p><strong>GitHub:</strong> {mockUserData.socialMedia.github}</p>
                </div>
            </div>

            {/* Update Account Form */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Update Account Details</h3>
                <form
                    onSubmit={handleFormSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-medium text-gray-600 mb-1">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block font-medium text-gray-600 mb-1">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block font-medium text-gray-600 mb-1">Language</label>
                        <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm"
                        >
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="col-span-1 md:col-span-2 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Details
                    </button>
                </form>
            </div>

            {/* Achievements Section */}
            <div className="space-y-4 p-4 bg-white rounded-md shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-2">🎯 Achievements</h3>
                <ul className="grid gap-3 list-none text-gray-800 md:grid-cols-2">
                    {mockUserData.achievements.map((achievement, index) => (
                        <li
                            key={index}
                            className="flex items-center space-x-2 bg-gray-50 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span>{achievement}</span>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Payment Methods Section */}
            <div className="space-y-4 p-4 bg-white rounded-md shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-2">💳 Payment Methods</h3>
                <ul className="grid gap-3 list-none text-gray-800 sm:grid-cols-2 lg:grid-cols-3">
                    {mockUserData.paymentMethods.map((method, index) => (
                        <li
                            key={index}
                            className="flex items-center space-x-3 bg-gray-50 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Dynamically Render Icons Based on Method */}
                            {method.includes('Visa') && <FaCreditCard className="text-blue-500"/>}
                            {method.includes('PayPal') && <FaPaypal className="text-blue-600"/>}
                            <span>{method}</span>
                        </li>
                    ))}
                </ul>
            </div>


            {/* Recent Activity Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {mockUserData.activityLog.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AccountModal;