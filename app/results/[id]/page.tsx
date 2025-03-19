"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Mock data for election results
const electionData = {
  title: "Mayor Election 2024",
  description: "Election for the city mayor position",
  totalVotes: 5432,
  candidates: [
    {
      id: "1",
      name: "Jane Smith",
      party: "Progressive Party",
      votes: 2345,
      color: "#4f46e5",
    },
    {
      id: "2",
      name: "John Doe",
      party: "Liberty Party",
      votes: 1876,
      color: "#ef4444",
    },
    {
      id: "3",
      name: "Alex Johnson",
      party: "Unity Coalition",
      votes: 1211,
      color: "#10b981",
    },
  ],
  demographics: [
    { age: "18-24", count: 876 },
    { age: "25-34", count: 1432 },
    { age: "35-44", count: 1245 },
    { age: "45-54", count: 987 },
    { age: "55-64", count: 654 },
    { age: "65+", count: 238 },
  ],
  turnout: [
    { district: "North", registered: 1200, voted: 876 },
    { district: "South", registered: 1500, voted: 1123 },
    { district: "East", registered: 1800, voted: 1432 },
    { district: "West", registered: 1300, voted: 987 },
    { district: "Central", registered: 1700, voted: 1014 },
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Calculate percentages for each candidate
  const resultsWithPercentages = electionData.candidates.map((candidate) => ({
    ...candidate,
    percentage: ((candidate.votes / electionData.totalVotes) * 100).toFixed(1),
  }))

  // Sort candidates by votes (descending)
  const sortedResults = [...resultsWithPercentages].sort((a, b) => b.votes - a.votes)

  // Calculate turnout percentages
  const turnoutData = electionData.turnout.map((district) => ({
    ...district,
    percentage: ((district.voted / district.registered) * 100).toFixed(1),
  }))

  return (
    <div className="container max-w-6xl py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{electionData.title} Results</h1>
            <p className="text-muted-foreground">{electionData.description}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Results
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{electionData.totalVotes.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Votes recorded on blockchain</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Winner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sortedResults[0].name}</div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sortedResults[0].color }} />
              <p className="text-sm text-muted-foreground">
                {sortedResults[0].party} • {sortedResults[0].percentage}% of votes
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Margin of Victory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(sortedResults[0].votes - sortedResults[1].votes).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              {(((sortedResults[0].votes - sortedResults[1].votes) / electionData.totalVotes) * 100).toFixed(1)}%
              difference
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="turnout">Turnout</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution</CardTitle>
              <CardDescription>Breakdown of votes by candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sortedResults}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="votes"
                      nameKey="name"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {sortedResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip
                      formatter={(value, name, props) => [
                        `${value.toLocaleString()} votes (${props.payload.percentage}%)`,
                        props.payload.party,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {sortedResults.map((candidate, index) => (
                  <div key={candidate.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: candidate.color }} />
                        <span className="font-medium">{candidate.name}</span>
                        <span className="text-sm text-muted-foreground">{candidate.party}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{candidate.votes.toLocaleString()}</span>
                        <span className="ml-2 text-muted-foreground">({candidate.percentage}%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full"
                        style={{
                          width: `${candidate.percentage}%`,
                          backgroundColor: candidate.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Voter Demographics</CardTitle>
                  <CardDescription>Breakdown of voters by age group</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">
                        This data is anonymized and collected only for statistical purposes. Individual votes cannot be
                        linked to demographic information.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={electionData.demographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value.toLocaleString()} voters`, "Count"]} />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnout" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout</CardTitle>
              <CardDescription>Percentage of registered voters who participated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={turnoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value, name) => [
                        value.toLocaleString(),
                        name === "registered" ? "Registered Voters" : "Actual Voters",
                      ]}
                    />
                    <Bar dataKey="registered" fill="#94a3b8" name="registered" />
                    <Bar dataKey="voted" fill="#4f46e5" name="voted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">District Turnout Rates</h4>
                {turnoutData.map((district) => (
                  <div key={district.district} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{district.district} District</span>
                      <span>
                        {district.percentage}% ({district.voted.toLocaleString()} of{" "}
                        {district.registered.toLocaleString()})
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${district.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

