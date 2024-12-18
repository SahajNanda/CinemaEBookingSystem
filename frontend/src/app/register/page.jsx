"use client";
import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/user';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "../components/navBar";
import axios from "axios";

export default function Register() {
    const router = useRouter();
    const { setEmailForRegistration } = useContext(AuthContext);
    const passwordRef = useRef(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardName, setCardName] = useState('');
    const [emailPromotions, setEmailPromotions] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!((cardNumber.length == 16 && expirationDate.length == 5 && cvv.length == 3) ||
        (cardNumber.length == 0 && expirationDate.length == 0 && cvv.length == 0))) {
            if (cardNumber.length != 16) {
                alert('Card number must be 16 digits');
                return;
            } else if (expirationDate.length != 5) {
                alert('Expiration date must be in the format MM/YY');
                return;
            } else if (cvv.length != 3) {
                alert('CVV must be 3 digits');
                return;
            } else if (cardName.length == 0) {
                alert('Card name is required');
                return;
            }
            return;
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            alert('Passwords do not match');
            passwordRef.current.focus();
            return;
        }

        if (password.length < 8) {
            setPassword("");
            setConfirmPassword("");
            alert('Password must be at least 8 characters');
            passwordRef.current.focus();
            return;
        }

        axios.post(
            'http://localhost:8080/customers',
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "userType": "CUSTOMER",
                "subscribedToPromotions": emailPromotions,
                "streetAddress": streetAddress,
                "city" : city,
                "state" : state,
                "postalCode": postalCode
            }
        ).then((response) => {
            console.log(response.data);
            
            const id = response.data.id;

            addCard(id);

            setEmailForRegistration(email);
            router.push('/register-confirmation');
        }).catch((error) => {
            console.log(error);
            alert("Email is already associated with an account");
        });
    };


    const addCard = (id) => {
        
        if (cardNumber.length == 16 && expirationDate.length == 5 && cvv.length == 3) {

            const [month, year] = expirationDate.split('/');
            const fullYear = `20${year}`;
            const day = '01';
            const expDate = `${fullYear}-${month}-${day}`;
            let friendlyName;

            if (cardName.length == 0) {
                friendlyName = `**** **** **** ${cardNumber.slice(-4)}`;
            } else {
                friendlyName = cardName + ` (...${cardNumber.slice(-4)})`;
            }

            axios.post(`http://localhost:8080/paymentCards?customerId=${id}`,
                {
                    friendlyName,
                    cardNumber,
                    "expirationDate": expDate,
                    "billingAddress": "TO DO"
                }
            ).then((response) => {
                console.log(response.data);
                alert('Card added successfully');
            }).catch((error) => {
                console.log(error);
                alert('Failed to add card');
            });

            return;
        } else {
            return;
        }

    };

    const handleExpirationDate = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
        if (value.length >= 3) {
            value = value.slice(0, 2) + '/' + value.slice(2); // Insert the slash after MM
        }
        if (value.length > 5) {
            value = value.slice(0, 5); // Limit input to MM/YY format
        }
        setExpirationDate(value);
    };

    const handleCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
        setCardNumber(value);
    };

    const handleCvv = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
        setCvv(value);
    };

    const handlePostalCode = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
        setPostalCode(value);
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col justify-center items-center m-8 p-8">
                <form className="bg-neutral-800/80 text-white p-10 m-auto shadow-lg rounded-lg w-full max-w-3xl" onSubmit={handleSubmit}>
                    <h2 className="text-4xl font-semibold mb-10">Registration</h2>
                    
                    <div className="flex flex-col px-2 mx-2 md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                        <div className="flex-1">
                            <label className="font-medium mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="font-medium mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            required
                        />
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pr-10 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                ref={passwordRef}
                                minLength={8}
                                required
                            />
                            <div
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 pr-10 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                minLength={8}
                                required
                            />
                            <div
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showConfirmPassword ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">Street Address</label>
                        <input
                            type="text"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 px-2 mx-2">
                        <div className="flex-1">
                            <label className="font-medium mb-1">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="font-medium mb-1">State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="font-medium mb-1">Postal Code</label>
                            <input
                                type="text"
                                value={postalCode}
                                onChange={handlePostalCode}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                maxLength={5}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">Card Name</label>
                        <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            maxLength={16}
                        />
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <label className="font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumber}
                            className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            maxLength={16}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 px-2 mx-2">
                        <div className="flex-1">
                            <label className="font-medium mb-1">Expiration Date (MM/YY)</label>
                            <input
                                type="text"
                                value={expirationDate}
                                onChange={handleExpirationDate}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="font-medium mb-1">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={handleCvv}
                                className="w-full p-3 rounded-lg bg-neutral-700/50 text-white outline-1 outline-navBarRed focus:outline focus:bg-neutral-700 hover:bg-neutral-700"
                                maxLength={3}
                            />
                        </div>
                    </div>

                    <div className="mb-4 px-2 mx-2">
                        <input 
                            type='checkbox'
                            checked={emailPromotions}
                            onChange={(e) => setEmailPromotions(e.target.checked)}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                        />
                        <label className='font-medium mb-1'>Receive email promotions?</label>
                    </div>
                    <div className='px-2 mx-2'>
                        <button type="submit" className="text-xl w-full bg-navBarRed text-white p-3 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
