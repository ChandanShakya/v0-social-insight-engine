import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { comments } = await request.json()

    if (!comments || typeof comments !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    // Split comments by newlines and filter empty lines
    const commentList = comments
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0)

    if (commentList.length === 0) {
      return NextResponse.json({ error: "No valid comments provided" }, { status: 400 })
    }

    // Mock sentiment analysis (in production, this would call an AI API)
    const analyzedComments = commentList.map((text) => {
      // Simple mock logic for demonstration
      const lowerText = text.toLowerCase()
      let sentiment: "Positive" | "Negative" | "Neutral" = "Neutral"
      let topic = "General"

      // Determine sentiment
      if (
        lowerText.includes("amazing") ||
        lowerText.includes("satisfied") ||
        lowerText.includes("love") ||
        lowerText.includes("great") ||
        lowerText.includes("excellent") ||
        lowerText.includes("quickly")
      ) {
        sentiment = "Positive"
      } else if (
        lowerText.includes("delayed") ||
        lowerText.includes("damaged") ||
        lowerText.includes("wrong") ||
        lowerText.includes("disappointed") ||
        lowerText.includes("poor") ||
        lowerText.includes("terrible")
      ) {
        sentiment = "Negative"
      }

      // Determine topic
      if (lowerText.includes("quality") || lowerText.includes("product")) {
        topic = "Product Quality"
      } else if (lowerText.includes("delivery") || lowerText.includes("shipping") || lowerText.includes("packaging")) {
        topic = "Delivery"
      } else if (lowerText.includes("support") || lowerText.includes("service")) {
        topic = "Service"
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        topic = "Price"
      } else if (lowerText.includes("color") || lowerText.includes("feature") || lowerText.includes("confirm")) {
        topic = "Product Features"
      }

      return { text, sentiment, topic }
    })

    // Generate summary
    const summary: { [key: string]: { positive: number; negative: number; neutral: number } } = {}
    const totalCounts = { positive: 0, negative: 0, neutral: 0 }

    analyzedComments.forEach((comment) => {
      if (!summary[comment.topic]) {
        summary[comment.topic] = { positive: 0, negative: 0, neutral: 0 }
      }

      if (comment.sentiment === "Positive") {
        summary[comment.topic].positive++
        totalCounts.positive++
      } else if (comment.sentiment === "Negative") {
        summary[comment.topic].negative++
        totalCounts.negative++
      } else {
        summary[comment.topic].neutral++
        totalCounts.neutral++
      }
    })

    return NextResponse.json({
      comments: analyzedComments,
      summary,
      totalCounts,
    })
  } catch (error) {
    console.error("[v0] Error in sentiment analysis:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}
