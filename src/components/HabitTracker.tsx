import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Habit Tracker
        </h1>
        <p className="text-muted-foreground text-lg">
          Build positive habits for growth
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The habit tracking feature will be available soon. You'll be able to create custom habits and track your progress.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}