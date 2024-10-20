"use client";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../contexts/user";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "../components/navBar";

export default function RegisterConfirmation() {
    const router = useRouter();
    const verifyCodeRef = useRef(null);
    const { registeredEmail, setEmailForRegistration } = useContext(AuthContext);
    const [verificationCode, setVerificationCode] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8080/customers/verify`, {
                params: {
                    email: registeredEmail,
                    token: verificationCode,
                },
            });

            if (response.status === 200) {
                alert("Email verified successfully!");
                setEmailForRegistration("");
                router.push("/login");
            }
        } catch (error) {
            setVerificationCode("");
            console.error("Verification failed:", error);
            alert("Invalid verification code. Please try again.");
            verifyCodeRef.current.focus();
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex flex-col p-24 mx-auto items-center">
                <div className="bg-neutral-800/60 p-8 shadow-lg rounded-lg m-4">
                    <h2 className="text-4xl font-semibold mb-6">Thank you for registering!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col p-2 m-2">
                        <p className="text-white mb-4">
                            A verification code has been sent to your email: <strong>{registeredEmail}</strong>
                        </p>
                        <label className="block text-xl font-semibold mb-2">Confirm Email</label>
                        <input
                            type="text"
                            placeholder="Enter Verification Code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="block w-full p-3 mt-1 mb-4 border border-gray-300 rounded-lg text-black focus:outline-none"
                            required
                            ref={verifyCodeRef}
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out">
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
