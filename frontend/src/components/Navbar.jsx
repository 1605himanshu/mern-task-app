import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-black/30 backdrop-blur-xl border-b border-white/10 
                 p-4 flex justify-between items-center shadow-lg"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-white tracking-wide">MERN Task App</div>
        <div className="text-sm text-gray-400 hidden sm:block">— Tasks & Notes</div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            {/* Profile */}
            <div className="flex items-center gap-3">
              {/* Avatar Circle */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="text-sm leading-tight">
                <div className="font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white text-sm rounded-lg shadow-md"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <div className="text-sm text-gray-300">Not logged in</div>
        )}

      </div>
    </motion.header>
  )
}
