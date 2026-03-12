import React, { useState } from 'react'
import { Registeruser } from '../api'
import { useNavigate, Link } from 'react-router-dom'
import '../Stylesheets/Register.css'

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Simple password strength checker
    const getPasswordStrength = (pass) => {
        if (pass.length === 0) return ''
        if (pass.length < 6) return 'weak'
        if (pass.length < 10) return 'medium'
        return 'strong'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        // Basic validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long")
            setLoading(false)
            return
        }

        try {
            const data = {
                username,
                email,
                password
            }

            const response = await Registeruser(data)
            if (response.success) {
                // Success - redirect to login
                navigate('/login', { 
                    state: { message: "Registration successful! Please login." } 
                })
            } else {
                setError(response.message || "Registration failed")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const passwordStrength = getPasswordStrength(password)

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Create Account</h1>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            Username
                        </label>
                        <input 
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <svg viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            Email Address
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <svg viewBox="0 0 24 24">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {password && (
                            <div className="password-strength">
                                <div className={`password-strength-bar ${passwordStrength}`}></div>
                            </div>
                        )}
                        <small style={{color: '#666', fontSize: '12px'}}>
                            Password must be at least 6 characters
                        </small>
                    </div>

                    <button 
                        type="submit" 
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="login-link">
                        Already have an account?
                        <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register