"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/components/web3-provider"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Wallet } from "lucide-react"

export default function LoginPage() {
  const { connect, isConnecting, isConnected, account } = useWeb3()
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOtp = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    // Simulate OTP sending
    setOtpSent(true)
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your email",
    })
  }

  const handleVerifyOtp = () => {
    if (!otp) {
      toast({
        title: "OTP required",
        description: "Please enter the verification code",
        variant: "destructive",
      })
      return
    }

    // Simulate OTP verification
    toast({
      title: "Verified",
      description: "Two-factor authentication successful",
    })

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleWalletLogin = async () => {
    if (!isConnected) {
      await connect()
    }

    if (isConnected) {
      // In a real app, you would verify the wallet signature here
      router.push("/dashboard")
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login to eVoteLedger</CardTitle>
            <CardDescription>Choose your preferred login method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="wallet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="email">Email + 2FA</TabsTrigger>
              </TabsList>
              <TabsContent value="wallet" className="space-y-4 pt-4">
                <div className="space-y-2 text-center">
                  <p className="text-sm text-muted-foreground">Connect with your Web3 wallet to access your account</p>
                  <Button className="w-full" onClick={handleWalletLogin} disabled={isConnecting}>
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : isConnected ? (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connected: {account?.substring(0, 6)}...{account?.substring(38)}
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="email" className="space-y-4 pt-4">
                {!otpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleSendOtp}>
                      Send Verification Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" onClick={handleVerifyOtp}>
                      Verify & Login
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => router.push("/register")}>
                Register
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

