import React, { useState, useContext } from 'react'
import API from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) return setError('Please fill all fields')
    try {
      await API.post('/auth/signup', { name, email, password })
      const res = await API.post('/auth/login', { email, password })
      login(res.data)
      nav('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      {/* Animated Container */}
      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Create an Account
        </h2>

        {/* Error Box */}
        {error && (
          <div className="text-red-400 bg-red-400/10 border border-red-400/30 px-3 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Name */}
        <label className="block mb-4 text-gray-300">
          Full Name
          <input
            className="w-full mt-1 px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        {/* Email */}
        <label className="block mb-4 text-gray-300">
          Email
          <input
            type="email"
            className="w-full mt-1 px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        {/* Password */}
        <label className="block mb-6 text-gray-300">
          Password
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:ring-2 focus:ring-green-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          Sign Up
        </motion.button>

        {/* Link */}
        <div className="mt-5 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
