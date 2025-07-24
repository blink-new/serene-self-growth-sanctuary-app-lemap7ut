import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Target } from 'lucide-react'

interface User {
  id: string
  email: string
  displayName?: string
}

interface HabitTrackerProps {
  user: User
}

export default function HabitTracker({ user }: HabitTrackerProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section with Background Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1593425460107-206b6b101d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHx3ZWxsbmVzcyUyMGhhYml0cyUyMG1vcm5pbmclMjByb3V0aW5lJTIwcGVhY2VmdWwlMjBsaWZlc3R5bGV8ZW58MHwwfHx8MTc1MzMyMzk5NHww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 via-green-400/30 to-emerald-500/40" />
        <div className="relative z-10 py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Habit Tracker
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Build positive habits and create lasting change in your life 🎯
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-green-500/10">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Growth Companion</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create custom habits, track your daily progress, and build streaks that transform your life one day at a time.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-500/90 transition-colors shadow-lg"
              >
                Track Habits
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}