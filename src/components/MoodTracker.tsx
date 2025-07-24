import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface User {
  id: string
  email: string
  displayName?: string
}

interface MoodTrackerProps {
  user: User
}

export default function MoodTracker({ user }: MoodTrackerProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your emotional journey
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The mood tracking feature will be available soon. You'll be able to log your daily mood and see trends over time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}