import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, reset } from '../../features/auth/authSlice';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = async () => {
        await dispatch(logoutUser());
        dispatch(reset());
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <header className='main-header'>
            <div className="container">
                <Link to='/'>
                    <h1 className='logo'>OT Resort</h1>
                </Link>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/rooms'>Rooms</Link>
                    {user ? (
                        <>
                            <Link to='/dashboard'>Dashboard</Link> {/* Add Dashboard link */}
                            <Link to='/rooms/create'>Create</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
