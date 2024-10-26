import { NextApiRequest, NextApiResponse } from "next";
import { getReviews } from "@/server/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const tweetsText = await getReviews(userId as string); // Ensure userId is a string
    res.status(200).json(tweetsText);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
