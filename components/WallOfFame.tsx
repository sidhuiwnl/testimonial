"use client";

import React, { useState, useEffect } from "react";
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
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const data = await getReviews(userId);
          setTweetsInfos(data?.tweetsText);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <WallOfSkeletonComp />;
  }

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
