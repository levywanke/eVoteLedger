"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

type Web3ContextType = {
  account: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  connect: () => Promise<void>
  disconnect: () => void
  isConnecting: boolean
  isConnected: boolean
  chainId: number | null
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  signer: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
  isConnected: false,
  chainId: null,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const { toast } = useToast()

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask browser extension",
        variant: "destructive",
      })
      return
    }

    try {
      setIsConnecting(true)

      // Request account access
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await browserProvider.send("eth_requestAccounts", [])
      const network = await browserProvider.getNetwork()
      const userSigner = await browserProvider.getSigner()

      setAccount(accounts[0])
      setProvider(browserProvider)
      setSigner(userSigner)
      setChainId(Number(network.chainId))

      // Save connection status to localStorage
      localStorage.setItem("eVoteLedgerConnected", "true")

      toast({
        title: "Connected",
        description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      })
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setChainId(null)
    localStorage.removeItem("eVoteLedgerConnected")
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully",
    })
  }

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      const shouldConnect = localStorage.getItem("eVoteLedgerConnected") === "true"
      if (shouldConnect) {
        await connect()
      }
    }

    autoConnect()

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else {
          setAccount(accounts[0])
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(Number(chainId))
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        connect,
        disconnect,
        isConnecting,
        isConnected: !!account,
        chainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)

