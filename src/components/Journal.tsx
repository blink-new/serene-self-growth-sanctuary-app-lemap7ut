import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Journal
        </h1>
        <p className="text-muted-foreground text-lg">
          Reflect on your thoughts and experiences
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The journaling feature will be available soon. You'll be able to write daily reflections and track your thoughts over time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}