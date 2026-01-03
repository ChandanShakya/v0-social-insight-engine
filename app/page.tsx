"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Users, MessageSquare, Heart, BarChart3, Sparkles, Moon, Sun } from "lucide-react"
import { AnalysisOutput } from "@/components/analysis-output"
import { MotivationSection } from "@/components/motivation-section"

export default function Page() {
  const [appState, setAppState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const handleAnalyze = async () => {
    setAppState("loading")
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to analyze data")
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
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          <div className="inline-flex items-center gap-2 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Social Insight Engine</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Analyze your social media presence and unlock actionable insights to grow your audience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-1" />
              </div>
            </div>
            <div className="text-2xl font-bold">Audience</div>
            <div className="text-sm text-muted-foreground">Growth Analysis</div>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-chart-2" />
              </div>
            </div>
            <div className="text-2xl font-bold">Engagement</div>
            <div className="text-sm text-muted-foreground">Rate Metrics</div>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-chart-3" />
              </div>
            </div>
            <div className="text-2xl font-bold">Content</div>
            <div className="text-sm text-muted-foreground">Performance</div>
          </Card>
        </div>

        {/* Action Section - Idle or Error State */}
        {(appState === "idle" || appState === "error") && (
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="p-8 md:p-12 text-center border-border/50">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to discover your insights?</h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Our AI-powered engine will analyze your social media presence and provide actionable recommendations
              </p>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                  <p className="text-xs text-destructive/80 mt-1">
                    Please try again or contact support if the issue persists
                  </p>
                </div>
              )}

              <Button size="lg" onClick={handleAnalyze} className="min-w-[200px]">
                <BarChart3 className="w-5 h-5 mr-2" />
                Start Analysis
              </Button>
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
              <h2 className="text-2xl font-bold mb-2">Analyzing your data...</h2>
              <p className="text-muted-foreground text-pretty">
                Processing your social media insights. This may take a few moments.
              </p>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {appState === "success" && analysisData && (
          <div className="space-y-8">
            <AnalysisOutput data={analysisData} />
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
                Run New Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
