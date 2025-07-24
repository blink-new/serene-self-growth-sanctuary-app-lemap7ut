import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BookOpen } from 'lucide-react'

interface User {
  id: string
  email: string
  displayName?: string
}

interface JournalProps {
  user: User
}

export default function Journal({ user }: JournalProps) {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1601128688653-7dc405e3ac4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzI1Njd8MHwxfHNlYXJjaHwxfHxqb3VybmFsJTIwd3JpdGluZyUyMG5vdGVib29rJTIwcGVhY2VmdWwlMjBtb3JuaW5nJTIwbGlnaHR8ZW58MHwwfHx8MTc1MzMyMzk4OHww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/30 to-accent/40" />
        <div className="relative z-10 py-16 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Daily Journal
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            Capture your thoughts, reflections, and moments of growth ✍️
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm border-primary/10">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Reflection Space</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This is where you'll write your daily reflections, capture meaningful moments, and track your personal growth journey.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg"
              >
                Start Writing
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}