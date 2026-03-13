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
            const data = { username, email, password }

            const response = await Registeruser(data)

            // ✅ Use response.data instead of response directly
            if (response.data.success) {
                // Success - redirect to login
                navigate('/login', { 
                    state: { message: "Registration successful! Please login." } 
                })
            } else {
                setError(response.data.message || "Registration failed")
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