import React, { useState, useEffect } from 'react'
import { Loginuser } from '../api'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../Stylesheets/Login.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    
    const navigate = useNavigate()
    const location = useLocation()

    // Check for success message from registration
    useEffect(() => {
        if (location.state?.message) {
            setSuccess(location.state.message)
            // Clear the location state
            window.history.replaceState({}, document.title)
        }

        // Check for saved email if "remember me" was checked
        const savedEmail = localStorage.getItem('rememberedEmail')
        if (savedEmail) {
            setEmail(savedEmail)
            setRememberMe(true)
        }
    }, [location])

    const handlelogin = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }

        try {
            const data = {
                email, 
                password
            }
            
            const response = await Loginuser(data)
            
            if (response.data.success) {
                // Handle remember me
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email)
                } else {
                    localStorage.removeItem('rememberedEmail')
                }

                // Store token
                localStorage.setItem("accessToken", response.data.accessToken)
                
                // Show success message briefly before redirect
                setSuccess("Login successful! Redirecting...")
                
                // Redirect to home page
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else {
                setError(response.data.message || "Login failed")
            }
            
        } catch (error) {
            setError(error.response?.data?.message || "Invalid email or password")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back!</h1>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handlelogin} className="login-form">
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
                            disabled={loading}
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
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>

                    <div className="remember-me">
                        <input 
                            type="checkbox" 
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={loading}
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>

                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="register-link">
                        Don't have an account?
                        <Link to="/register">Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login