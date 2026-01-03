"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface MotivationSectionProps {
  data: {
    totalCounts: {
      positive: number
      negative: number
      neutral: number
    }
  }
}

export function MotivationSection({ data }: MotivationSectionProps) {
  const total = data.totalCounts.positive + data.totalCounts.negative + data.totalCounts.neutral
  const positivePercent = ((data.totalCounts.positive / total) * 100).toFixed(1)
  const negativePercent = ((data.totalCounts.negative / total) * 100).toFixed(1)

  const getMotivationalMessage = () => {
    if (data.totalCounts.positive > data.totalCounts.negative * 2) {
      return {
        title: "Excellent Customer Sentiment!",
        description: "Your customers are highly satisfied. Keep up the great work and maintain this positive momentum.",
      }
    } else if (data.totalCounts.negative > data.totalCounts.positive) {
      return {
        title: "Opportunity for Improvement",
        description:
          "There are areas that need attention. Use these insights to address customer concerns and improve satisfaction.",
      }
    } else {
      return {
        title: "You're Making Progress!",
        description:
          "Your customer feedback shows promise. Focus on the actionable insights below to enhance satisfaction.",
      }
    }
  }

  const message = getMotivationalMessage()

  const recommendations = [
    {
      icon: TrendingUp,
      title: "Leverage Positive Feedback",
      description: `${positivePercent}% of comments are positive. Share testimonials and highlight what's working well to build trust.`,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: AlertCircle,
      title: "Address Negative Comments",
      description: `${negativePercent}% of comments need attention. Respond promptly and empathetically to resolve customer concerns.`,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: CheckCircle2,
      title: "Monitor Trends",
      description:
        "Track recurring topics and sentiment patterns over time to proactively improve customer experience.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Motivation Header */}
      <Card className="p-8 md:p-12 text-center border-border/50 bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-balance">{message.title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{message.description}</p>
      </Card>

      {/* Actionable Recommendations */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
              <div className={`w-12 h-12 rounded-lg ${rec.bgColor} flex items-center justify-center mb-4`}>
                <rec.icon className={`w-6 h-6 ${rec.color}`} />
              </div>
              <h4 className="font-bold mb-2 text-lg">{rec.title}</h4>
              <p className="text-sm text-muted-foreground text-pretty">{rec.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Inspirational Quote */}
      <Card className="p-8 md:p-12 text-center border-border/50">
        <blockquote className="text-xl md:text-2xl font-semibold mb-4 text-balance">
          "Customer feedback is the compass that guides business improvement."
        </blockquote>
        <p className="text-muted-foreground">Use these insights to create better experiences</p>
      </Card>
    </div>
  )
}
