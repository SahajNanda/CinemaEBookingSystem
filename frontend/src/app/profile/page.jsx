"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from "../components/navBar";

export default function EditProfile() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Clear any previous errors
        setError('');

        // Perform registration logic (e.g., API call)

        // Redirect to a specified route
        router.push('/register-confirmation');
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center m-8 p-8">
                <h2 className="text-4xl font-semibold mb-6">Edit Profile</h2>
                <div className='grid grid-cols-2'>
                    <div className='p-4'>
                        <form className="bg-white p-10 m-auto shadow-lg rounded-lg w-full max-w-3xl" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black"> 
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-lg font-medium mb-1 text-black">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-lg font-medium mb-1 text-black">Street Address</label>
                            <input
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">State</label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">Postal Code</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                />
                            </div>
                        </div>

                        <button type="submit" className="text-xl bg-blue-600 text-white p-3 px-6 rounded-md hover:bg-blue-700 w-full">
                            Save Profile
                        </button>
                    </form>
                    </div>
                    <div className='p-4'>
                        <form className="bg-white p-10 m-auto shadow-lg rounded-lg w-full max-w-3xl" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="mb-4">
                            <label className="text-lg font-medium mb-1 text-black">Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">Expiration Date (MM/YY)</label>
                                <input
                                    type="text"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-lg font-medium mb-1 text-black">CVV</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                                />
                            </div>
                        </div>

                        <button type="submit" className="text-xl bg-blue-600 text-white p-3 px-6 rounded-md hover:bg-blue-700 w-full">
                            Add New Card
                        </button>
                    </form>

                    <form className="bg-white p-10 m-auto shadow-lg rounded-lg w-full max-w-3xl mt-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="mb-4">
                        <label className="text-lg font-medium mb-1 text-black">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-lg font-medium mb-1 text-black">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md text-black box-border"
                            required
                        />
                    </div>

                    <button type="submit" className="text-xl bg-blue-600 text-white p-3 px-6 rounded-md hover:bg-blue-700 w-full">
                        Reset Password
                    </button>
                </form>
                    </div>
                </div>
            </div>
        </div>
    );
}