"use client";

import { getReviews } from "@/server/queries";
import { Avatar } from "@radix-ui/react-avatar";

import { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

interface TweetInfo {
  profile: string;
  username: string;
  handle: string;
  tweetContent: string;
  verified: boolean;
  id: string;
  userId: string;
}

export default function Review({ userId }: { userId: string | undefined }) {
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews(userId);
      setTweetsInfos(data?.tweetsText);
      console.log(data)
    };
    if (userId) fetchData();
  }, [userId]);

  return (
    <div>
      {tweetsInfos?.map((tweetsInfo) => (
        <div
          key={tweetsInfo.id}
          className="flex items-center space-x-4 p-4 border-b"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={tweetsInfo.profile} alt={tweetsInfo.username} className="rounded-full object-contain" />
            <AvatarFallback>{tweetsInfo.username}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <span className="font-bold">{tweetsInfo.username}</span>
            </div>
            <span className="text-gray-500">@{tweetsInfo.handle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
