"use client";

import { getReviews } from "@/server/queries";
import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Cog } from "lucide-react";
import { format } from "date-fns";
import {
  SquareArrowOutUpRight,
  ArrowRightFromLine,
  CheckCheck,
  CircleSlash,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";


interface TweetInfo {
  profile: string;
  username: string;
  handle: string;
  tweetContent: string;
  verified: boolean;
  id: string;
  userId: string;
  createdAt: Date;
}

interface ReviewProps {
  userId: string | undefined;
  setTweetCount: (count: number) => void;
}

interface TweetMedia{
  userId : string;
  id : string;
  image : string;
  tweetName : string;
}

export default function Review({ userId, setTweetCount }: ReviewProps) {
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();
  const [tweetMedias,setTweetMedias] = useState<TweetMedia[] | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviews(userId);
      setTweetsInfos(data?.tweetsText);
      setTweetMedias(data?.tweetMedia);
      setTweetCount(data?.tweetsText.length || 0);
    };
    if (userId) fetchData();
  }, [userId, setTweetCount]);

  console.log(tweetMedias)
  return (
    <div className="space-y-2">
      {tweetsInfos?.map((tweetsInfo) => (
        <div
          key={tweetsInfo.id}
          className="flex justify-around hover:bg-zinc-100 transition-colors duration-500 ease-in-out rounded-xl w-full items-center space-x-4 p-4 border-b"
        >
          <div className="flex flex-col w-3/12 space-y-2 items-start">
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

          <div className="flex flex-col w-6/12 space-y-3 ">
            <p className="text-start">{tweetsInfo.tweetContent}</p>
            {/* {tweetMedias?.filter(media => media.tweetId === tweetsInfo.id )
              .map((media) => (
                <Image
                  key={media.id}
                  src={media.image}
                  alt="Tweet Media"
                  width={100}
                  height={100}
                  className="rounded-lg object-contain max-h-64"
                />
            ))} */}
            <p className="text-gray-500 text-medium">
              📅 {format(new Date(tweetsInfo.createdAt), "MMM d, yyyy")}
            </p>
          </div>

          <div className="flex w-3/12 flex-col justify-end items-end space-y-2">
            <DropDownMenus />
            <Button variant="ghost" className="w-[120px] h-10 px-4 py-2 ">
              Approved
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DropDownMenus() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-[120px] rounded-lg bg-gradient-to-b space-x-1 from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2 ">
          <Cog className="mr-2" /> Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem>
          {" "}
          <SquareArrowOutUpRight />
          Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <ArrowRightFromLine />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CheckCheck />
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CircleSlash />
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
