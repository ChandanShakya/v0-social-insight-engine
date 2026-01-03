"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Heart, MessageSquare, Eye } from "lucide-react"

interface AnalysisOutputProps {
  data: any
}

export function AnalysisOutput({ data }: AnalysisOutputProps) {
  // Mock data structure - replace with actual API response
  const metrics = {
    followers: { value: "24.5K", change: 12.5, trend: "up" },
    engagement: { value: "8.2%", change: 3.1, trend: "up" },
    reach: { value: "156K", change: -2.4, trend: "down" },
    posts: { value: "48", change: 15.3, trend: "up" },
  }

  const topPosts = [
    { title: "Product Launch Announcement", engagement: 2450, likes: 1820, comments: 320 },
    { title: "Behind the Scenes Content", engagement: 1890, likes: 1520, comments: 210 },
    { title: "Customer Success Story", engagement: 1650, likes: 1340, comments: 180 },
  ]

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Your Analysis Results</h2>
        <p className="text-muted-foreground">Here's a comprehensive overview of your social media performance</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-chart-1" />
            </div>
            {metrics.followers.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-chart-1" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.followers.value}</div>
          <div className="text-sm text-muted-foreground mb-2">Total Followers</div>
          <div
            className={`text-sm font-medium ${metrics.followers.trend === "up" ? "text-chart-1" : "text-destructive"}`}
          >
            {metrics.followers.trend === "up" ? "+" : ""}
            {metrics.followers.change}% from last period
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-chart-2" />
            </div>
            {metrics.engagement.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-chart-2" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.engagement.value}</div>
          <div className="text-sm text-muted-foreground mb-2">Engagement Rate</div>
          <div
            className={`text-sm font-medium ${metrics.engagement.trend === "up" ? "text-chart-2" : "text-destructive"}`}
          >
            {metrics.engagement.trend === "up" ? "+" : ""}
            {metrics.engagement.change}% from last period
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-chart-3" />
            </div>
            {metrics.reach.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-chart-3" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.reach.value}</div>
          <div className="text-sm text-muted-foreground mb-2">Total Reach</div>
          <div className={`text-sm font-medium ${metrics.reach.trend === "up" ? "text-chart-3" : "text-destructive"}`}>
            {metrics.reach.trend === "up" ? "+" : ""}
            {metrics.reach.change}% from last period
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-chart-4" />
            </div>
            {metrics.posts.trend === "up" ? (
              <TrendingUp className="w-5 h-5 text-chart-4" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div className="text-3xl font-bold mb-1">{metrics.posts.value}</div>
          <div className="text-sm text-muted-foreground mb-2">Posts Published</div>
          <div className={`text-sm font-medium ${metrics.posts.trend === "up" ? "text-chart-4" : "text-destructive"}`}>
            {metrics.posts.trend === "up" ? "+" : ""}
            {metrics.posts.change}% from last period
          </div>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card className="p-6 md:p-8 border-border/50">
        <h3 className="text-xl font-bold mb-6">Top Performing Content</h3>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-semibold mb-2">{post.title}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-chart-1">{post.engagement.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">engagements</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
