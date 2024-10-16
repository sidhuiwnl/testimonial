"use client";

import { getReviews } from "@/server/queries";
import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Cog } from "lucide-react";

interface TweetInfo {
  profile: string;
  username: string;
  handle: string;
  tweetContent: string;
  verified: boolean;
  id: string;
  userId: string;
}

interface ReviewProps {
  userId: string | undefined;
  setTweetCount: (count: number) => void;
}

export default function Review({ userId, setTweetCount }: ReviewProps) {
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews(userId);
      setTweetsInfos(data?.tweetsText);
      setTweetCount(data?.tweetsText.length || 0);
    };
    if (userId) fetchData();
  }, [userId]);

  return (
    <div>
      {tweetsInfos?.map((tweetsInfo) => (
        <div
          key={tweetsInfo.id}
          className="flex justify-around  items-center space-x-4 p-4 border-b"
        >
          <div className="flex flex-col">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={tweetsInfo.profile}
                alt={tweetsInfo.username}
                className="rounded-full object-contain"
              />
              <AvatarFallback>{tweetsInfo.username}</AvatarFallback>
            </Avatar>

            <div className="flex items-center">
              <span className="font-bold">{tweetsInfo.username}</span>
            </div>
            <span className="text-gray-500">@{tweetsInfo.handle}</span>
          </div>

          <div className="flex flex-col w-[500px] ">
            <p className="text-left">{tweetsInfo.tweetContent}</p>
            
          </div>
          <div className="flex flex-col space-y-2">
            <Button className="w-[120px] rounded-lg bg-gradient-to-b space-x-1 from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2 ">
              <Cog/>
              Options
            </Button>
            <Button variant="ghost">Approved</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
