
'use client'

import { useState, useEffect } from 'react'



export default function Home() {

  const [habits, setHabits] = useState([])

  const [newHabit, setNewHabit] = useState({ name: '', description: '' })

  const [loading, setLoading] = useState(true)



  // Fetch habits from backend

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



  // Add new habit

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

      }

    } catch (error) {

      console.error('Error adding habit:', error)

    }

  }



  // Log habit completion

  const logHabit = async (habitId) => {

    const today = new Date().toISOString().split('T')[0]

    

    try {

      const response = await fetch(`http://localhost:3001/api/habits/${habitId}/log`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ completed_date: today })

      })

      

      if (response.ok) {

        alert('Habit logged for today! 🎉')

      }

    } catch (error) {

      console.error('Error logging habit:', error)

    }

  }



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-xl">Loading habits...</div>

      </div>

    )

  }



  return (

    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">

          🎯 Habit Tracker

        </h1>



        {/* Add New Habit Form */}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>

          <form onSubmit={addHabit} className="space-y-4">

            <div>

              <input

                type="text"

                placeholder="Habit name (e.g., Drink 8 glasses of water)"

                value={newHabit.name}

                onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}

                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                required

              />

            </div>

            <div>

              <textarea

                placeholder="Description (optional)"

                value={newHabit.description}

                onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}

                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                rows="3"

              />

            </div>

            <button

              type="submit"

              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"

            >

              Add Habit

            </button>

          </form>

        </div>



        {/* Habits List */}

        <div className="space-y-4">

          <h2 className="text-xl font-semibold mb-4">Your Habits</h2>

          {habits.length === 0 ? (

            <div className="text-center py-8 text-gray-500">

              No habits yet. Add your first habit above!

            </div>

          ) : (

            habits.map((habit) => (

              <div key={habit.id} className="bg-white rounded-lg shadow-md p-6">

                <div className="flex justify-between items-start">

                  <div className="flex-1">

                    <h3 className="text-lg font-medium text-gray-800">{habit.name}</h3>

                    {habit.description && (

                      <p className="text-gray-600 mt-1">{habit.description}</p>

                    )}

                    <p className="text-sm text-gray-400 mt-2">

                      Created: {new Date(habit.created_at).toLocaleDateString()}

                    </p>

                  </div>

                  <button

                    onClick={() => logHabit(habit.id)}

                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors ml-4"

                  >

                    ✓ Done Today

                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  )

}

