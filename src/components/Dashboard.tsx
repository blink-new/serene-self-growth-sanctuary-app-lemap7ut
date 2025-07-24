import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  BookOpen,
  Heart,
  Sparkles,
  Quote
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import blink from '../blink/client'

interface User {
  id: string
  email: string
  displayName?: string
}

interface DashboardProps {
  user: User
}

interface Stats {
  journalStreak: number
  totalEntries: number
  avgMood: number
  habitsCompleted: number
  totalHabits: number
}

const quotes = [
  "The journey of a thousand miles begins with one step.",
  "Growth begins at the end of your comfort zone.",
  "Every day is a new beginning. Take a deep breath and start again.",
  "Progress, not perfection, is the goal.",
  "Be yourself; everyone else is already taken.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there."
]

export default function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState<Stats>({
    journalStreak: 0,
    totalEntries: 0,
    avgMood: 0,
    habitsCompleted: 0,
    totalHabits: 0
  })
  const [loading, setLoading] = useState(true)
  const [dailyQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Get journal entries
      const journalEntries = await blink.db.journalEntries.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })

      // Get mood entries from last 7 days
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      
      const moodEntries = await blink.db.moodEntries.list({
        where: { 
          userId: user.id,
          createdAt: { gte: sevenDaysAgo.toISOString() }
        }
      })

      // Get habits and today's completions
      const habits = await blink.db.habits.list({
        where: { userId: user.id, isActive: "1" }
      })

      const today = new Date().toISOString().split('T')[0]
      const habitEntries = await blink.db.habitEntries.list({
        where: { 
          userId: user.id,
          date: today,
          completed: "1"
        }
      })

      // Calculate stats
      const avgMood = moodEntries.length > 0 
        ? moodEntries.reduce((sum, entry) => sum + entry.moodValue, 0) / moodEntries.length
        : 0

      // Calculate journal streak (simplified - consecutive days with entries)
      let streak = 0
      const today_date = new Date()
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today_date)
        checkDate.setDate(checkDate.getDate() - i)
        const dateStr = checkDate.toISOString().split('T')[0]
        
        const hasEntry = journalEntries.some(entry => 
          entry.createdAt.startsWith(dateStr)
        )
        
        if (hasEntry) {
          streak++
        } else if (i > 0) {
          break
        }
      }

      setStats({
        journalStreak: streak,
        totalEntries: journalEntries.length,
        avgMood: Math.round(avgMood * 10) / 10,
        habitsCompleted: habitEntries.length,
        totalHabits: habits.length
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const habitProgress = stats.totalHabits > 0 ? (stats.habitsCompleted / stats.totalHabits) * 100 : 0

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
            backgroundImage: `url('https://images.unsplash.com/photo-1598826739205-d09823c3bc3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmUlMjB6ZW4lMjBtaW5kZnVsbmVzc3xlbnwwfDB8fHwxNzUzMzIzOTg0fDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-accent/30" />
        <div className="relative z-10 py-16 px-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Welcome back, {user.displayName || user.email.split('@')[0]}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Your journey of growth continues today ✨
          </p>
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Quote size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground italic">
                  "{dailyQuote}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Daily inspiration for your growth
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 gentle-float">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journal Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loading ? '...' : stats.journalStreak}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.journalStreak === 1 ? 'day' : 'days'} in a row
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 gentle-float">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reflections</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {loading ? '...' : stats.totalEntries}
              </div>
              <p className="text-xs text-muted-foreground">
                journal entries written
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 gentle-float">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-500">
                {loading ? '...' : stats.avgMood || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                out of 5 this week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 gentle-float">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Habits</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {loading ? '...' : `${stats.habitsCompleted}/${stats.totalHabits}`}
              </div>
              <div className="mt-2">
                <Progress value={habitProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden group"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1601128688653-7dc405e3ac4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxqb3VybmFsJTIwd3JpdGluZyUyMG5vdGVib29rJTIwcGVhY2VmdWwlMjBtb3JuaW5nJTIwbGlnaHR8ZW58MHwwfHx8MTc1MzMyMzk4OHww&ixlib=rb-4.1.0&q=80&w=400')`
                  }}
                />
                <div className="relative z-10">
                  <BookOpen className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Write in Journal</h3>
                  <p className="text-sm text-muted-foreground">Reflect on your day and capture your thoughts</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 bg-gradient-to-r from-pink-500/10 to-pink-500/5 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 overflow-hidden group"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1552650272-b8a34e21bc4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwyfHx3ZWxsbmVzcyUyMGhhYml0cyUyMG1vcm5pbmclMjByb3V0aW5lJTIwcGVhY2VmdWwlMjBsaWZlc3R5bGV8ZW58MHwwfHx8MTc1MzMyMzk5NHww&ixlib=rb-4.1.0&q=80&w=400')`
                  }}
                />
                <div className="relative z-10">
                  <Heart className="h-8 w-8 text-pink-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Log Mood</h3>
                  <p className="text-sm text-muted-foreground">Track how you're feeling today</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 overflow-hidden group"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1593425460107-206b6b101d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw0fHx3ZWxsbmVzcyUyMGhhYml0cyUyMG1vcm5pbmclMjByb3V0aW5lJTIwcGVhY2VmdWwlMjBsaWZlc3R5bGV8ZW58MHwwfHx8MTc1MzMyMzk5NHww&ixlib=rb-4.1.0&q=80&w=400')`
                  }}
                />
                <div className="relative z-10">
                  <Target className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Check Habits</h3>
                  <p className="text-sm text-muted-foreground">Mark today's progress and build streaks</p>
                </div>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}