import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, Vote } from "lucide-react"
import Link from "next/link"

interface ElectionCardProps {
  election: {
    id: string
    title: string
    description: string
    endDate: string
    candidates: number
    voters: number
    completed?: boolean
  }
}

export function ElectionCard({ election }: ElectionCardProps) {
  // Calculate time remaining
  const endDate = new Date(election.endDate)
  const now = new Date()
  const timeRemaining = endDate.getTime() - now.getTime()
  const daysRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)))

  // Format date for display
  const formattedDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{election.title}</CardTitle>
          {election.completed ? (
            <Badge variant="secondary">Completed</Badge>
          ) : daysRemaining === 0 ? (
            <Badge variant="destructive">Ending Today</Badge>
          ) : (
            <Badge variant="outline">{daysRemaining} days left</Badge>
          )}
        </div>
        <CardDescription>{election.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>Ends: {formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{election.candidates} candidates</span>
          </div>
        </div>
        {election.voters > 0 && (
          <div className="mt-4">
            <div className="text-sm text-muted-foreground">{election.voters} votes cast</div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: `${Math.min(100, (election.voters / 2000) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {election.completed ? (
          <Link href={`/results/${election.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Results
            </Button>
          </Link>
        ) : (
          <Link href={`/vote/${election.id}`} className="w-full">
            <Button className="w-full">
              <Vote className="mr-2 h-4 w-4" />
              {election.voters > 0 ? "Vote Now" : "Register to Vote"}
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

