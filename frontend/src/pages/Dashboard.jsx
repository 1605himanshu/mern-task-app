import React, { useState, useEffect, useContext } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tasks', { params: { q: query } })
      setTasks(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setEditing(null)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return setError('Title is required')
    setError(null)
    try {
      if (editing) {
        await API.put(`/tasks/${editing._id}`, { title, description })
      } else {
        await API.post('/tasks', { title, description })
      }
      resetForm()
      fetchTasks()
    } catch (err) {
      console.error(err)
      setError('Failed to save task')
    }
  }

  const handleEdit = (task) => {
    setEditing(task)
    setTitle(task.title)
    setDescription(task.description || '')
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`)
      fetchTasks()
    } catch (err) {
      console.error(err)
      setError('Failed to delete task')
    }
  }

  const handleToggle = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed })
      fetchTasks()
    } catch (err) {
      console.error(err)
      setError('Failed to update task')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <main className="p-6 max-w-4xl mx-auto">
        
        {/* HEADER */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-sm text-gray-400">Manage your tasks efficiently</p>
        </motion.section>

        {/* ADD / EDIT FORM */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-4 shadow-lg"
        >
          {error && (
            <div className="text-red-400 bg-red-400/10 border border-red-400/30 px-3 py-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title…"
              className="flex-1 px-4 py-3 bg-white/10 rounded-lg border border-white/20
                        focus:ring-2 focus:ring-blue-400 outline-none transition text-white"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="flex-1 px-4 py-3 bg-white/10 rounded-lg border border-white/20
                        focus:ring-2 focus:ring-blue-400 outline-none transition text-white"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
            >
              {editing ? 'Update' : 'Add'}
            </motion.button>
          </form>
        </motion.section>

        {/* SEARCH */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            className="flex-1 px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:ring-2 focus:ring-green-400 outline-none transition text-white"
          />

          <button
            onClick={fetchTasks}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            Search
          </button>

          <button
            onClick={() => { setQuery(''); fetchTasks() }}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition"
          >
            Clear
          </button>
        </motion.section>

        {/* TASK LIST */}
        <section className="grid gap-4">
          {loading && <div className="text-gray-400 animate-pulse">Loading tasks…</div>}

          {!loading && tasks.length === 0 && (
            <div className="text-gray-400 text-center py-10">
              No tasks found.
            </div>
          )}

          {tasks.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TaskCard
                task={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </section>

      </main>
    </div>
  )
}
