import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import blink from './blink/client'
import Dashboard from './components/Dashboard'
import Journal from './components/Journal'
import MoodTracker from './components/MoodTracker'
import HabitTracker from './components/HabitTracker'
import AICoach from './components/AICoach'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import { Toaster } from './components/ui/toaster'

type Page = 'dashboard' | 'journal' | 'mood' | 'habits' | 'coach'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Serene Sanctuary
            </h1>
            <p className="text-muted-foreground text-lg">
              Your digital space for mindful growth and reflection
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => blink.auth.login()}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />
      case 'journal':
        return <Journal user={user} />
      case 'mood':
        return <MoodTracker user={user} />
      case 'habits':
        return <HabitTracker user={user} />
      case 'coach':
        return <AICoach user={user} />
      default:
        return <Dashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
      />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <Toaster />
    </div>
  )
}

export default App