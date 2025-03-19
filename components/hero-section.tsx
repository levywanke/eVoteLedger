import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Secure Blockchain Voting for the Future
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transparent, secure, and accessible voting powered by blockchain technology. Vote with confidence from
                anywhere in the world.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-foreground opacity-20 blur-3xl"></div>
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-background via-muted to-background border shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">eVoteLedger</div>
                  <div className="mt-2 text-muted-foreground">Secure • Transparent • Decentralized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

