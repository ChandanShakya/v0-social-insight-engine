"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, MessageSquare, Moon, Sun, BarChart3 } from "lucide-react"
import { SentimentOutput } from "@/components/sentiment-output"
import { MotivationSection } from "@/components/motivation-section"

export default function Page() {
  const [appState, setAppState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const preferredTheme = savedTheme || "dark"
    setTheme(preferredTheme)
    document.documentElement.classList.toggle("dark", preferredTheme === "dark")
  }, [])

  const handleAnalyze = async () => {
    setAppState("loading")
    setError(null)

    try {
      const response = await fetch("/api/fetch-and-analyze", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch and analyze comments")
      }

      const data = await response.json()
      setAnalysisData(data)
      setAppState("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setAppState("error")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Customer Sentiment Analysis</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Analyze customer comments from Facebook to understand sentiment and categorize concerns
          </p>
        </div>

        {/* Input Section - Idle or Error State */}
        {(appState === "idle" || appState === "error") && (
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="p-8 border-border/50">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Ready to Analyze</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Click the button below to analyze all customer comments
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}

                <Button size="lg" onClick={handleAnalyze} className="w-full">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analyze Comments
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Loading Section */}
        {appState === "loading" && (
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="p-12 text-center border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Fetching and analyzing comments...</h2>
              <p className="text-muted-foreground text-pretty">
                Retrieving comments from Facebook and detecting sentiment patterns
              </p>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {appState === "success" && analysisData && (
          <div className="space-y-8">
            <SentimentOutput data={analysisData} />

            {/* Motivation Section */}
            <MotivationSection data={analysisData} />

            {/* Analyze Again Button */}
            <div className="text-center pt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAppState("idle")
                  setAnalysisData(null)
                  setError(null)
                }}
              >
                Analyze Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
