"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { ElectionCard } from "@/components/election-card"
import { useWeb3 } from "@/components/web3-provider"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for elections
const activeElections = [
  {
    id: "1",
    title: "City Council Election 2025",
    description: "Vote for your local city council representative",
    endDate: "2025-05-15T23:59:59",
    candidates: 5,
    voters: 1243,
  },
  {
    id: "2",
    title: "Community Fund Allocation",
    description: "Decide how to allocate the community development fund",
    endDate: "2025-04-30T23:59:59",
    candidates: 3,
    voters: 567,
  },
]

const upcomingElections = [
  {
    id: "3",
    title: "School Board Election",
    description: "Select representatives for the local school board",
    endDate: "2025-06-10T23:59:59",
    candidates: 8,
    voters: 0,
  },
  {
    id: "4",
    title: "Neighborhood Association",
    description: "Annual election for neighborhood association leadership",
    endDate: "2025-07-05T23:59:59",
    candidates: 4,
    voters: 0,
  },
]

const pastElections = [
  {
    id: "5",
    title: "Mayor Election 2024",
    description: "Election for the city mayor position",
    endDate: "2024-11-15T23:59:59",
    candidates: 3,
    voters: 5432,
    completed: true,
  },
  {
    id: "6",
    title: "Budget Proposal Vote",
    description: "Vote on the annual budget allocation proposal",
    endDate: "2024-12-20T23:59:59",
    candidates: 2,
    voters: 1876,
    completed: true,
  },
]

export default function DashboardPage() {
  const { isConnected, account } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter elections based on search query
  const filterElections = (elections: any[]) => {
    if (!searchQuery) return elections
    return elections.filter(
      (election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        election.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search elections..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {filterElections(activeElections).length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filterElections(activeElections).map((election) => (
                    <ElectionCard key={election.id} election={election} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground">No active elections found</p>
                    {searchQuery && (
                      <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                        Clear search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {filterElections(upcomingElections).length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filterElections(upcomingElections).map((election) => (
                    <ElectionCard key={election.id} election={election} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground">No upcoming elections found</p>
                    {searchQuery && (
                      <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                        Clear search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {filterElections(pastElections).length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filterElections(pastElections).map((election) => (
                    <ElectionCard key={election.id} election={election} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground">No past elections found</p>
                    {searchQuery && (
                      <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                        Clear search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wallet Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isConnected ? "Connected" : "Not Connected"}</div>
                {isConnected && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {account?.substring(0, 6)}...{account?.substring(38)}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  {isConnected
                    ? "Your wallet is connected and ready to vote"
                    : "Connect your wallet to participate in elections"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voting Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 Votes Cast</div>
                <p className="text-xs text-muted-foreground mt-4">
                  You have participated in 2 out of 4 eligible elections
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 Elections</div>
                <p className="text-xs text-muted-foreground mt-4">
                  You have 2 active elections ending within the next 30 days
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

