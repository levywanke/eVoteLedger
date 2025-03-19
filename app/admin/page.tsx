"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { BarChart3, Calendar, Check, ChevronDown, Clock, Plus, Search, Trash, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for elections
const elections = [
  {
    id: "1",
    title: "City Council Election 2025",
    status: "active",
    startDate: "2025-04-01",
    endDate: "2025-05-15",
    candidates: 5,
    voters: 1243,
  },
  {
    id: "2",
    title: "Community Fund Allocation",
    status: "active",
    startDate: "2025-04-10",
    endDate: "2025-04-30",
    candidates: 3,
    voters: 567,
  },
  {
    id: "3",
    title: "School Board Election",
    status: "upcoming",
    startDate: "2025-06-01",
    endDate: "2025-06-10",
    candidates: 8,
    voters: 0,
  },
  {
    id: "4",
    title: "Neighborhood Association",
    status: "upcoming",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    candidates: 4,
    voters: 0,
  },
  {
    id: "5",
    title: "Mayor Election 2024",
    status: "completed",
    startDate: "2024-11-01",
    endDate: "2024-11-15",
    candidates: 3,
    voters: 5432,
  },
]

// Mock data for voters
const voters = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    walletAddress: "0x71c...9e3f",
    status: "verified",
    registrationDate: "2025-03-15",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    walletAddress: "0x82d...7a4c",
    status: "verified",
    registrationDate: "2025-03-16",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james@example.com",
    walletAddress: "0x93e...5b2d",
    status: "pending",
    registrationDate: "2025-03-18",
  },
  {
    id: "4",
    name: "Sarah Brown",
    email: "sarah@example.com",
    walletAddress: "0xa4f...3c1e",
    status: "verified",
    registrationDate: "2025-03-19",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@example.com",
    walletAddress: "0xb5g...2d0f",
    status: "rejected",
    registrationDate: "2025-03-20",
  },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 14),
  })

  // Filter elections based on search query
  const filterElections = (items: any[]) => {
    if (!searchQuery) return items
    return items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Filter voters based on search query
  const filterVoters = (items: any[]) => {
    if (!searchQuery) return items
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Elections</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{elections.length}</div>
                <p className="text-xs text-muted-foreground">
                  {elections.filter((e) => e.status === "active").length} active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Voters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{voters.length}</div>
                <p className="text-xs text-muted-foreground">
                  {voters.filter((v) => v.status === "verified").length} verified
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {elections.reduce((sum, election) => sum + election.voters, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Across all elections</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Election</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(() => {
                    const upcoming = elections.filter((e) => e.status === "upcoming")
                    if (upcoming.length === 0) return "None"

                    // Sort by start date and get the closest one
                    const nextElection = [...upcoming].sort(
                      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
                    )[0]

                    // Format the date
                    return new Date(nextElection.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  })()}
                </div>
                <p className="text-xs text-muted-foreground">School Board Election</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="elections" className="space-y-4">
            <TabsList>
              <TabsTrigger value="elections">Elections</TabsTrigger>
              <TabsTrigger value="voters">Voters</TabsTrigger>
              <TabsTrigger value="create">Create Election</TabsTrigger>
            </TabsList>

            <TabsContent value="elections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Elections</CardTitle>
                  <CardDescription>View and manage all elections in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Range</TableHead>
                        <TableHead>Candidates</TableHead>
                        <TableHead>Voters</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterElections(elections).map((election) => (
                        <TableRow key={election.id}>
                          <TableCell className="font-medium">{election.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                election.status === "active"
                                  ? "default"
                                  : election.status === "upcoming"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {election.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(election.startDate).toLocaleDateString()} -{" "}
                            {new Date(election.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{election.candidates}</TableCell>
                          <TableCell>{election.voters}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Election</DropdownMenuItem>
                                <DropdownMenuItem>Manage Candidates</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete Election</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voters" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Voters</CardTitle>
                  <CardDescription>View and verify registered voters</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterVoters(voters).map((voter) => (
                        <TableRow key={voter.id}>
                          <TableCell className="font-medium">{voter.name}</TableCell>
                          <TableCell>{voter.email}</TableCell>
                          <TableCell className="font-mono text-xs">{voter.walletAddress}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                voter.status === "verified"
                                  ? "default"
                                  : voter.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {voter.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(voter.registrationDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                {voter.status === "pending" && (
                                  <>
                                    <DropdownMenuItem>
                                      <Check className="mr-2 h-4 w-4" /> Verify Voter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash className="mr-2 h-4 w-4" /> Reject Voter
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {voter.status === "verified" && (
                                  <DropdownMenuItem className="text-destructive">Revoke Verification</DropdownMenuItem>
                                )}
                                {voter.status === "rejected" && (
                                  <DropdownMenuItem>
                                    <Check className="mr-2 h-4 w-4" /> Approve Voter
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Election</CardTitle>
                  <CardDescription>Set up a new blockchain-based election</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Election Title</Label>
                    <Input id="title" placeholder="Enter election title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Provide a description of the election" rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label>Election Period</Label>
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Candidates</Label>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Plus className="h-3.5 w-3.5" />
                        Add Candidate
                      </Button>
                    </div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center text-sm text-muted-foreground">
                          No candidates added yet. Click "Add Candidate" to get started.
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <Label>Voter Eligibility</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="verified" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="verified" className="text-sm font-normal">
                          Require verified wallet address
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="email" className="text-sm font-normal">
                          Require email verification
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="2fa" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="2fa" className="text-sm font-normal">
                          Require two-factor authentication
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Election</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

