import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';

const DeleteAccountConfirmation: React.FC<{ onDelete: () => void, setShow: Dispatch<SetStateAction<boolean>> }> = ({ onDelete, setShow }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleDelete = () => {
        if (inputValue === 'yes delete my account') {
            onDelete();
        } else {
            alert('Please type "yes delete my account" to confirm.');
        }
    };

    return (
        <div style={{ position: "absolute", transform: "translate(-50%,-50%)", top: "50%", left: "50%" }} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-700 mb-4">Type "yes delete my account" to confirm:</p>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between items-center">
                <Button
                    onClick={() => setShow(false)}
                    className="mt-4 flex-[1] bg-white text-gray-900 py-2 rounded-md hover:bg-white/80 transition duration-200">
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    className="mt-4 flex-[1] bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200">
                    Delete My Account
                </Button>
            </div>
        </div>
    );
};

export default DeleteAccountConfirmation;
