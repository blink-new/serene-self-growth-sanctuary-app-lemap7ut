import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Sparkles } from 'lucide-react'

interface User {
  id: string
  email: string
  displayName?: string
}

interface AICoachProps {
  user: User
}

export default function AICoach({ user }: AICoachProps) {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1570799650082-f3eb7207f588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHw4fHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmUlMjB6ZW4lMjBtaW5kZnVsbmVzc3xlbnwwfDB8fHwxNzUzMzIzOTg0fDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-indigo-400/30 to-blue-500/40" />
        <div className="relative z-10 py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            AI Coach
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Your personal mindset guide powered by wisdom and AI ✨
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-purple-500/10">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Wisdom Companion</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Receive personalized mindset tips and insights based on your journal entries, mood patterns, and habit progress.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-500/90 transition-colors shadow-lg"
              >
                Get Guidance
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}