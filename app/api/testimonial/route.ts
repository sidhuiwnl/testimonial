import { getReviews } from "@/server/queries";

export default async function handler(req: any, res: any) {
  const { userId } = req.query;

  try {
    const tweetsText = await getReviews(userId); // Adjusted to directly receive the array
    res.status(200).json(tweetsText);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
