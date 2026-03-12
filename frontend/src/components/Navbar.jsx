import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../Stylesheets/Navbar.css'
import { LogOut } from '../api'

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('/')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('accessToken')
        setIsLoggedIn(!!token)
        
        // Set active link based on current path
        setActiveLink(location.pathname)
    }, [location])

    const handleLogout = async() => {
        // Clear user data from localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('rememberedEmail')
        const res = await LogOut();
        console.log(res.data);
        
        setIsLoggedIn(false)
        setMenuOpen(false)
        navigate('/login')
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="brand-logo">
                        ✓
                    </div>
                    <Link to="/" className="brand-name" onClick={closeMenu}>
                        TodoApp
                    </Link>
                </div>

                <button 
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link 
                            to="/todo" 
                            className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5zM12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                            </svg>
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={`nav-link ${activeLink === '/todos' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            All Todos
                        </Link>
                    </li>

                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link 
                                    to="/login" 
                                    className={`nav-link ${activeLink === '/login' ? 'active' : ''}`}
                                    onClick={closeMenu}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                                    </svg>
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link 
                                    to="/register" 
                                    className={`nav-link ${activeLink === '/register' ? 'active' : ''}`}
                                    onClick={closeMenu}
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Register
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button 
                                onClick={handleLogout}
                                className="nav-link logout"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                </svg>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar