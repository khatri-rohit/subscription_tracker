import { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'motion/react'

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader } from 'lucide-react';

interface Props {
    onDelete: () => void,
    setShow: Dispatch<SetStateAction<boolean>>
    load: boolean
}

const DeleteAccountConfirmation = ({ onDelete, setShow, load }: Props) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleDelete = () => {
        if (inputValue === 'yes delete my account') {
            onDelete();
        } else {
            alert('Please type "yes delete my account" to confirm.');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1, top: "50%", left: "50%" }}
            style={{ position: "absolute", transform: "translate(-50%,-50%)" }}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4 dark:text-black">
                Confirm Account Deletion
            </h2>
            <p className="text-gray-700 mb-4">Type "yes delete my account" to confirm:</p>
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none dark:text-black"
            />
            <div className="flex justify-between items-center gap-1">
                <Button
                    onClick={() => setShow(false)}
                    disabled={load}
                    className="mt-4 flex-[1] bg-white text-gray-900 py-2 rounded-md hover:bg-white/80 transition duration-200 cursor-pointer border hover:shadow-md">
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    className="mt-4 flex-[1] bg-red-600 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 cursor-pointer hover:shadow-md">
                    {load ? (<Loader size={45} className='animate-spin opacity-75 text-white' />) : "Delete My Account"}
                </Button>
            </div>
        </motion.div>
    );
};

export default DeleteAccountConfirmation;
