"use client";

import React, { useState, useEffect, Suspense } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

import { getReviews } from "@/server/queries";
import { useSession } from "@/app/lib/auth-client";
import WallOfSkeletonComp from "./skeletons/WallOffameSkeleton";

interface TweetInfo {
  profile: string;
  username: string;
  handle: string;
  tweetContent: string;
  verified: boolean;
  id: string;
  userId: string;
  createdAt: Date;
  images: string[];
  status: string;
}

export function LayoutGridDemo() {
  const session = useSession();
  const userId = session.data?.user.id;
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (userId) {
      setIsLoading(true);
      try {
        setError(null);
        const data = await getReviews(userId);
        const filteredTweet = data?.tweetsText.filter(
          (tweet) => tweet.status === "Approved"
        );
        setTweetsInfos(filteredTweet);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if(isLoading){
    return <WallOfSkeletonComp/>
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen">
      <BentoGrid className="max-w-4xl mx-auto  ">
        {tweetsInfos?.map((tweetsInfo, i) => (
          <BentoGridItem
            key={tweetsInfo.id}
            title={tweetsInfo.username}
            description={tweetsInfo.tweetContent}
            imageUrl={tweetsInfo.images[0]}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
