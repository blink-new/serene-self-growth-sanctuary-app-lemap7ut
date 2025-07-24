import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI Coach
        </h1>
        <p className="text-muted-foreground text-lg">
          Get personalized guidance for your growth journey
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your AI-powered mindset coach will be available soon. Get personalized tips based on your journal entries and habits.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}