
'use client'

import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Plus, Target, TrendingUp, Calendar, CheckCircle2, Flame, Zap } from 'lucide-react'



export default function Home() {

  const [habits, setHabits] = useState([])

  const [newHabit, setNewHabit] = useState({ name: '', description: '' })

  const [loading, setLoading] = useState(true)

  const [showAddForm, setShowAddForm] = useState(false)

  const [completedToday, setCompletedToday] = useState(new Set())



  useEffect(() => {

    fetchHabits()

  }, [])



  const fetchHabits = async () => {

    try {

      const response = await fetch('http://localhost:3001/api/habits')

      const data = await response.json()

      setHabits(data)

    } catch (error) {

      console.error('Error fetching habits:', error)

    } finally {

      setLoading(false)

    }

  }



  const addHabit = async (e) => {

    e.preventDefault()

    if (!newHabit.name.trim()) return



    try {

      const response = await fetch('http://localhost:3001/api/habits', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(newHabit)

      })

      

      if (response.ok) {

        const habit = await response.json()

        setHabits([habit, ...habits])

        setNewHabit({ name: '', description: '' })

        setShowAddForm(false)

      }

    } catch (error) {

      console.error('Error adding habit:', error)

    }

  }



  const logHabit = async (habitId) => {

    const today = new Date().toISOString().split('T')[0]

    

    try {

      const response = await fetch(`http://localhost:3001/api/habits/${habitId}/log`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ completed_date: today })

      })

      

      if (response.ok) {

        setCompletedToday(new Set([...completedToday, habitId]))

      }

    } catch (error) {

      console.error('Error logging habit:', error)

    }

  }



  const containerVariants = {

    hidden: { opacity: 0 },

    visible: {

      opacity: 1,

      transition: {

        staggerChildren: 0.1

      }

    }

  }



  const itemVariants = {

    hidden: { y: 20, opacity: 0 },

    visible: {

      y: 0,

      opacity: 1,

      transition: {

        type: "spring",

        stiffness: 100

      }

    }

  }



  const habitCardVariants = {

    hidden: { scale: 0.8, opacity: 0 },

    visible: {

      scale: 1,

      opacity: 1,

      transition: {

        type: "spring",

        stiffness: 120,

        damping: 12

      }

    },

    hover: {

      scale: 1.02,

      y: -5,

      transition: {

        type: "spring",

        stiffness: 400,

        damping: 10

      }

    }

  }



  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">

        <motion.div

          initial={{ scale: 0.8, opacity: 0 }}

          animate={{ scale: 1, opacity: 1 }}

          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}

          className="text-white text-2xl font-bold flex items-center gap-3"

        >

          <Zap className="w-8 h-8 text-yellow-400" />

          Loading your habits...

        </motion.div>

      </div>

    )

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">

      {/* Animated Background Elements */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>

      </div>



      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Header */}

        <motion.div

          initial={{ y: -50, opacity: 0 }}

          animate={{ y: 0, opacity: 1 }}

          transition={{ type: "spring", stiffness: 100 }}

          className="text-center mb-12"

        >

          <div className="flex items-center justify-center gap-3 mb-4">

            <motion.div

              animate={{ rotate: 360 }}

              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}

            >

              <Target className="w-12 h-12 text-yellow-400" />

            </motion.div>

            <h1 className="text-5xl font-bold text-white">

              Habit<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Flow</span>

            </h1>

          </div>

          <p className="text-xl text-gray-300">Transform your life, one habit at a time</p>

        </motion.div>



        {/* Stats Cards */}

        <motion.div

          variants={containerVariants}

          initial="hidden"

          animate="visible"

          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"

        >

          <motion.div

            variants={itemVariants}

            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"

          >

            <div className="flex items-center gap-3">

              <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">

                <CheckCircle2 className="w-6 h-6 text-white" />

              </div>

              <div>

                <p className="text-gray-300 text-sm">Total Habits</p>

                <p className="text-2xl font-bold text-white">{habits.length}</p>

              </div>

            </div>

          </motion.div>



          <motion.div

            variants={itemVariants}

            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"

          >

            <div className="flex items-center gap-3">

              <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">

                <Flame className="w-6 h-6 text-white" />

              </div>

              <div>

                <p className="text-gray-300 text-sm">Completed Today</p>

                <p className="text-2xl font-bold text-white">{completedToday.size}</p>

              </div>

            </div>

          </motion.div>



          <motion.div

            variants={itemVariants}

            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"

          >

            <div className="flex items-center gap-3">

              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">

                <TrendingUp className="w-6 h-6 text-white" />

              </div>

              <div>

                <p className="text-gray-300 text-sm">Success Rate</p>

                <p className="text-2xl font-bold text-white">

                  {habits.length > 0 ? Math.round((completedToday.size / habits.length) * 100) : 0}%

                </p>

              </div>

            </div>

          </motion.div>

        </motion.div>



        {/* Add Habit Button */}

        <motion.div

          initial={{ scale: 0 }}

          animate={{ scale: 1 }}

          transition={{ delay: 0.5, type: "spring", stiffness: 150 }}

          className="flex justify-center mb-8"

        >

          <motion.button

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

            onClick={() => setShowAddForm(!showAddForm)}

            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3"

          >

            <Plus className="w-6 h-6" />

            Add New Habit

          </motion.button>

        </motion.div>



        {/* Add Habit Form */}

        <AnimatePresence>

          {showAddForm && (

            <motion.div

              initial={{ opacity: 0, height: 0 }}

              animate={{ opacity: 1, height: "auto" }}

              exit={{ opacity: 0, height: 0 }}

              transition={{ duration: 0.3 }}

              className="mb-8"

            >

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-2xl mx-auto">

                <form onSubmit={addHabit} className="space-y-4">

                  <div>

                    <input

                      type="text"

                      placeholder="What habit do you want to build?"

                      value={newHabit.name}

                      onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}

                      className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"

                      required

                    />

                  </div>

                  <div>

                    <textarea

                      placeholder="Why is this habit important to you?"

                      value={newHabit.description}

                      onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}

                      className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"

                      rows="3"

                    />

                  </div>

                  <div className="flex gap-4">

                    <motion.button

                      whileHover={{ scale: 1.02 }}

                      whileTap={{ scale: 0.98 }}

                      type="submit"

                      className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"

                    >

                      Create Habit

                    </motion.button>

                    <motion.button

                      whileHover={{ scale: 1.02 }}

                      whileTap={{ scale: 0.98 }}

                      type="button"

                      onClick={() => setShowAddForm(false)}

                      className="px-6 py-3 bg-gray-500/20 text-white rounded-lg font-semibold hover:bg-gray-500/30 transition-all"

                    >

                      Cancel

                    </motion.button>

                  </div>

                </form>

              </div>

            </motion.div>

          )}

        </AnimatePresence>



        {/* Habits Grid */}

        <motion.div

          variants={containerVariants}

          initial="hidden"

          animate="visible"

          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

        >

          {habits.length === 0 ? (

            <motion.div

              variants={itemVariants}

              className="col-span-full text-center py-12"

            >

              <div className="text-gray-400 text-lg">

                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />

                <p>No habits yet. Create your first habit to get started!</p>

              </div>

            </motion.div>

          ) : (

            habits.map((habit) => {

              const isCompleted = completedToday.has(habit.id)

              return (

                <motion.div

                  key={habit.id}

                  variants={habitCardVariants}

                  whileHover="hover"

                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transition-all duration-300 ${

                    isCompleted ? 'ring-2 ring-green-400 bg-green-500/20' : ''

                  }`}

                >

                  <div className="flex justify-between items-start mb-4">

                    <div className="flex-1">

                      <h3 className="text-xl font-semibold text-white mb-2">{habit.name}</h3>

                      {habit.description && (

                        <p className="text-gray-300 text-sm mb-3">{habit.description}</p>

                      )}

                      <p className="text-gray-400 text-xs">

                        Created: {new Date(habit.created_at).toLocaleDateString()}

                      </p>

                    </div>

                  </div>

                  

                  <motion.button

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: 0.95 }}

                    onClick={() => logHabit(habit.id)}

                    disabled={isCompleted}

                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${

                      isCompleted

                        ? 'bg-green-500 text-white cursor-not-allowed'

                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'

                    }`}

                  >

                    {isCompleted ? (

                      <span className="flex items-center justify-center gap-2">

                        <CheckCircle2 className="w-5 h-5" />

                        Completed Today!

                      </span>

                    ) : (

                      'Mark as Done'

                    )}

                  </motion.button>

                </motion.div>

              )

            })

          )}

        </motion.div>

      </div>

    </div>

  )

}

