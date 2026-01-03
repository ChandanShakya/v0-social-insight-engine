"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Target, Zap, Trophy } from "lucide-react"

interface MotivationSectionProps {
  data: any
}

export function MotivationSection({ data }: MotivationSectionProps) {
  const recommendations = [
    {
      icon: Target,
      title: "Optimize Posting Times",
      description:
        "Your audience is most active between 2-4 PM. Schedule posts during these peak hours for maximum reach.",
      color: "chart-1",
    },
    {
      icon: Zap,
      title: "Boost Video Content",
      description:
        "Video posts generate 3x more engagement. Consider incorporating short-form videos into your strategy.",
      color: "chart-2",
    },
    {
      icon: Trophy,
      title: "Engage with Comments",
      description: "Your response rate increased engagement by 24%. Keep the conversation going with your audience.",
      color: "chart-3",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Motivation Header */}
      <Card className="p-8 md:p-12 text-center border-border/50 bg-gradient-to-br from-primary/5 to-chart-1/5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-balance">You're making great progress!</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Your engagement is growing steadily. Keep up the momentum with these personalized recommendations to
          accelerate your success.
        </p>
      </Card>

      {/* Actionable Recommendations */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
              <div className={`w-12 h-12 rounded-lg bg-${rec.color}/10 flex items-center justify-center mb-4`}>
                <rec.icon className={`w-6 h-6 text-${rec.color}`} />
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
          "Success in social media is about consistency, authenticity, and connecting with your audience."
        </blockquote>
        <p className="text-muted-foreground">Keep creating value and your community will grow</p>
      </Card>
    </div>
  )
}
