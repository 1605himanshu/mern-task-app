import React from 'react'
import { motion } from 'framer-motion'

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg flex justify-between items-start gap-4"
    >

      {/* LEFT SIDE */}
      <div className="flex-1">
        <div className="flex items-center gap-3">

          {/* Animated Checkbox */}
          <motion.input
            whileTap={{ scale: 0.8 }}
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggle(task)}
            className="w-5 h-5 rounded accent-green-500 cursor-pointer"
            aria-label={`Mark ${task.title} completed`}
          />

          {/* Title */}
          <h3
            className={`font-semibold text-lg ${
              task.completed
                ? 'line-through text-gray-400'
                : 'text-white'
            }`}
          >
            {task.title}
          </h3>
        </div>

        {/* Description */}
        {task.description && (
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Date */}
        <div className="mt-2 text-xs text-gray-500">
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString()
            : ''}
        </div>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-col items-end gap-2">

        {/* EDIT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => onEdit(task)}
          className="px-3 py-1.5 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
        >
          Edit
        </motion.button>

        {/* DELETE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => onDelete(task._id)}
          className="px-3 py-1.5 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white shadow-md transition"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  )
}
