import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center bg-white dark:bg-gray-800'>
            <Loader size={45} className='animate-spin opacity-75 text-black dark:text-white' />
        </div>
    )
}

export default Loading