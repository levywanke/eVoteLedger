"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for candidates
const candidates = [
  {
    id: "1",
    name: "Jane Smith",
    party: "Progressive Party",
    description: "Focused on environmental sustainability and social justice",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "John Doe",
    party: "Liberty Party",
    description: "Advocating for economic growth and individual freedoms",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Alex Johnson",
    party: "Unity Coalition",
    description: "Working to bridge divides and find common ground solutions",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Maria Garcia",
    party: "Future Alliance",
    description: "Promoting innovation, technology, and education reform",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Sam Wilson",
    party: "Independent",
    description: "Running as an independent with focus on local community needs",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function VotePage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step === 1 && !selectedCandidate) {
      toast({
        title: "Selection required",
        description: "Please select a candidate to continue",
        variant: "destructive",
      })
      return
    }

    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!selectedCandidate) return

    setIsSubmitting(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsComplete(true)
      toast({
        title: "Vote submitted successfully",
        description: "Your vote has been recorded on the blockchain",
      })
    } catch (error) {
      toast({
        title: "Error submitting vote",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">City Council Election 2025</h1>
        <p className="text-muted-foreground">Vote for your local city council representative</p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>Select Candidate</span>
          <span>Review</span>
          <span>Submit</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Candidate</CardTitle>
              <CardDescription>Choose one candidate from the list below</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedCandidate || ""} onValueChange={setSelectedCandidate} className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors ${
                      selectedCandidate === candidate.id ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value={candidate.id} id={`candidate-${candidate.id}`} className="mt-1" />
                    <div className="flex flex-1 items-start space-x-4">
                      <img
                        src={candidate.image || "/placeholder.svg"}
                        alt={candidate.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`candidate-${candidate.id}`} className="text-lg font-medium">
                          {candidate.name}
                        </Label>
                        <p className="text-sm font-medium text-primary">{candidate.party}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{candidate.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === 2 && selectedCandidate && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Selection</CardTitle>
              <CardDescription>Please confirm your vote before submitting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-medium">Your Selected Candidate</h3>

                {(() => {
                  const candidate = candidates.find((c) => c.id === selectedCandidate)
                  if (!candidate) return null

                  return (
                    <div className="mt-4 flex items-start space-x-4">
                      <img
                        src={candidate.image || "/placeholder.svg"}
                        alt={candidate.name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xl font-bold">{candidate.name}</p>
                        <p className="text-primary">{candidate.party}</p>
                        <p className="mt-2 text-muted-foreground">{candidate.description}</p>
                      </div>
                    </div>
                  )
                })()}

                <div className="mt-6 rounded-lg bg-muted p-4">
                  <p className="text-sm">
                    <strong>Important:</strong> Your vote will be recorded on the blockchain and cannot be changed once
                    submitted. Please ensure your selection is correct.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={handleBack}>
                Change Selection
              </Button>
              <Button onClick={handleNext}>
                Proceed to Submit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === 3 && selectedCandidate && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Vote</CardTitle>
              <CardDescription>Your vote will be securely recorded on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              {!isComplete ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">By clicking "Submit Vote", you confirm that:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                      <li>You are eligible to vote in this election</li>
                      <li>You are casting your vote of your own free will</li>
                      <li>You understand this action cannot be reversed</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      This will initiate a blockchain transaction. Please keep this window open until the transaction is
                      complete.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">Vote Successfully Recorded</h3>
                  <p className="mt-2 text-muted-foreground">Your vote has been securely recorded on the blockchain</p>
                  <p className="mt-4 text-sm">
                    Transaction Hash: <span className="font-mono">0x71c...9e3f</span>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              {!isComplete ? (
                <>
                  <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Vote"
                    )}
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={() => router.push("/dashboard")}>
                  Return to Dashboard
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

