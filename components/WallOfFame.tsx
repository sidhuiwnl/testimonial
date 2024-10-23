"use client";

import React, { useState,useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { getReviews } from "@/server/queries";
import { useSession } from "@/app/lib/auth-client";

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews(userId);
      setTweetsInfos(data?.tweetsText);
    };

    fetchData();
  }, [userId]);

  const tweetCard = tweetsInfos?.map((tweetsInfo) => ({
    id: Number(tweetsInfo.id),
    content: <TweetCardContent tweet={tweetsInfo} />,
    className: "col-span-1",
    thumbnail: tweetsInfo.images[0],
  }));

  if (!tweetCard) {
    return "";
  }

  return (
    <div className="h-screen py-10 w-full  rounded-xl mt-2">
      <LayoutGrid cards={tweetCard} />
    </div>
  );
}

const TweetCardContent = ({ tweet }: { tweet: TweetInfo }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {tweet.username}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {tweet.tweetContent}
      </p>
    </div>
  );
};


