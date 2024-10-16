"use client";

import { useState } from "react";
import Review from "@/components/ReviewComponent";

interface ReviewClientProps {
  userId: string | undefined;
}

export default function ReviewClient({ userId }: ReviewClientProps) {
  const [tweetCount, setTweetCount] = useState(0);

  return (
    <div className=" space-y-3">
      <h1 className="text-4xl sm:text-5xl  font-semibold tracking-tight text-zinc-800">
        Your reviews <span className="text-black">({tweetCount})</span>
      </h1>
      <p className="font-medium mt-2 text-zinc-900 antialiased">
        Manage all your reviews in one place and approve the ones you like.
      </p>
      <Review userId={userId} setTweetCount={setTweetCount} />
    </div>
  );
}
