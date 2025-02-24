import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="">
            <NavLink to={'/auth/signup'} className={'p-2 text-xl text-white bg-green-600 mx-1'}>Sign Up</NavLink>
            <NavLink to={'/auth/signin'} className={'p-2 text-xl text-white bg-blue-600 mx-1'}>Sign In</NavLink>
        </div>
    )
}

export default Home