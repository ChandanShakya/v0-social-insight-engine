"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ThumbsUp, ThumbsDown, MinusCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface SentimentData {
  comments: Array<{
    text: string
    sentiment: "Positive" | "Negative" | "Neutral"
    topic: string
  }>
  summary: {
    [key: string]: {
      positive: number
      negative: number
      neutral: number
    }
  }
  totalCounts: {
    positive: number
    negative: number
    neutral: number
  }
}

const ITEMS_PER_PAGE = 5

export function SentimentOutput({ data }: { data: SentimentData }) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.ceil(data.comments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentComments = data.comments.slice(startIndex, endIndex)

  // Prepare data for pie chart
  const sentimentDistribution = [
    { name: "Positive", value: data.totalCounts.positive, color: "#10b981" },
    { name: "Negative", value: data.totalCounts.negative, color: "#ef4444" },
    { name: "Neutral", value: data.totalCounts.neutral, color: "#6b7280" },
  ]

  // Prepare data for bar chart
  const concernData = Object.entries(data.summary).map(([concern, counts]) => ({
    concern,
    Positive: counts.positive,
    Negative: counts.negative,
    Neutral: counts.neutral,
  }))

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return <ThumbsUp className="w-4 h-4" />
      case "Negative":
        return <ThumbsDown className="w-4 h-4" />
      default:
        return <MinusCircle className="w-4 h-4" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "Negative":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{data.totalCounts.positive}</div>
              <div className="text-sm text-muted-foreground">Positive</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{data.totalCounts.negative}</div>
              <div className="text-sm text-muted-foreground">Negative</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
              <MinusCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{data.totalCounts.neutral}</div>
              <div className="text-sm text-muted-foreground">Neutral</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution Pie Chart */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Concern Breakdown Bar Chart */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold mb-4">Sentiment by Concern Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={concernData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="concern" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="Positive" fill="#10b981" />
              <Bar dataKey="Negative" fill="#ef4444" />
              <Bar dataKey="Neutral" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Concern Summary Table */}
      <Card className="p-6 border-border/50">
        <h3 className="text-lg font-semibold mb-4">Concern Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Concern Type</th>
                <th className="text-center py-3 px-4 font-semibold">Positive</th>
                <th className="text-center py-3 px-4 font-semibold">Negative</th>
                <th className="text-center py-3 px-4 font-semibold">Neutral</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.summary).map(([concern, counts]) => (
                <tr key={concern} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">{concern}</td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {counts.positive}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold">
                      {counts.negative}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 font-semibold">
                      {counts.neutral}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Individual Comments */}
      <Card className="p-6 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Analyzed Comments</h3>
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, data.comments.length)} of {data.comments.length}
          </div>
        </div>

        <div className="space-y-3">
          {currentComments.map((comment, index) => (
            <div key={startIndex + index} className="p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm leading-relaxed mb-2">{comment.text}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getSentimentColor(comment.sentiment)}>
                      {getSentimentIcon(comment.sentiment)}
                      <span className="ml-1">{comment.sentiment}</span>
                    </Badge>
                    <Badge variant="outline">{comment.topic}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-9 h-9 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
