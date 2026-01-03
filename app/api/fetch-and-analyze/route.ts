import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Demo comments data for frontend visualization
    const demoComments = [
      "This product is amazing! Love the quality and fast delivery.",
      "Disappointed with the delivery time. Took too long.",
      "Great customer service, they helped me quickly.",
      "The product arrived damaged. Very poor packaging.",
      "Excellent quality! Worth every penny.",
      "Wrong item was delivered. Terrible experience.",
      "Good product but a bit expensive for what it is.",
      "The color is exactly as shown. Very satisfied!",
      "Support team was unhelpful. Bad experience overall.",
      "Fast shipping and great product quality. Thank you!",
      "The size was wrong. Disappointed with the product.",
      "Amazing features! This is exactly what I needed.",
      "Delivery was delayed by a week. Not happy.",
      "Perfect product, perfect service. Highly recommend!",
      "Poor quality material. Not worth the price.",
    ]

    // Analyze the comments (mock sentiment analysis)
    const analyzedComments = demoComments.map((text) => {
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
        lowerText.includes("quickly") ||
        lowerText.includes("good") ||
        lowerText.includes("perfect") ||
        lowerText.includes("thank")
      ) {
        sentiment = "Positive"
      } else if (
        lowerText.includes("delayed") ||
        lowerText.includes("damaged") ||
        lowerText.includes("wrong") ||
        lowerText.includes("disappointed") ||
        lowerText.includes("poor") ||
        lowerText.includes("terrible") ||
        lowerText.includes("bad") ||
        lowerText.includes("worst")
      ) {
        sentiment = "Negative"
      }

      // Determine topic
      if (lowerText.includes("quality") || lowerText.includes("product")) {
        topic = "Product Quality"
      } else if (lowerText.includes("delivery") || lowerText.includes("shipping") || lowerText.includes("packaging")) {
        topic = "Delivery"
      } else if (lowerText.includes("support") || lowerText.includes("service") || lowerText.includes("help")) {
        topic = "Service"
      } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("expensive")) {
        topic = "Price"
      } else if (lowerText.includes("color") || lowerText.includes("feature") || lowerText.includes("size")) {
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
    console.error("Error analyzing comments:", error)
    return NextResponse.json({ error: "Failed to analyze comments" }, { status: 500 })
  }
}
