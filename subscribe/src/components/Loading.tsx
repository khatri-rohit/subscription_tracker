import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Loader size={45} className='animate-spin opacity-75' />
        </div>
    )
}

export default Loading