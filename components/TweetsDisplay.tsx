import React, { useEffect, useState } from "react";
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
import { getReviews, updateTweetStatus } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedTooltip } from "./ui/animated-tooltip";

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

interface ReviewProps {
  userId: string | undefined;
  setTweetCount: (count: number) => void;
}

function TweetModal({ tweet }: { tweet: TweetInfo }) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-black border-none">
      <div className="mt-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={tweet.profile} alt={tweet.username} />
            <AvatarFallback>{tweet.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-white">{tweet.username}</p>
            <p className="text-gray-500">@{tweet.handle}</p>
          </div>
        </div>
        <p className="mt-4 text-white">{tweet.tweetContent}</p>
        {tweet.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="Tweet Media"
            width={300}
            height={300}
            className="mt-4 rounded-lg object-contain"
          />
        ))}
        <Badge className="mt-4 mr-2 bg-white text-black font-medium hover:bg-white">
          {" "}
          <p>{format(new Date(tweet.createdAt), "MMM d, yyyy")}</p>
        </Badge>
        {tweet.status === "approved" ? (
          <Badge className="mt-2 bg-teal-700 text-white hover:bg-teal-700 hover:text-white font-medium">
            <p>Status: {tweet.status}</p>
          </Badge>
        ) : (
          <Badge className="mt-2 bg-white text-black hover:bg-white hover:text-black font-medium">
            <p>Status: {tweet.status}</p>
          </Badge>
        )}
      </div>
    </DialogContent>
  );
}

export default function TweetsDisplay({ userId, setTweetCount }: ReviewProps) {
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await getReviews(userId);
        setTweetsInfos(data?.tweetsText || []);
        setTweetCount(data?.tweetsText.length || 0);
      }
    };
    fetchData();
  }, [userId, setTweetCount]);

  async function handleApprovalChange(id: string, status: "approved") {
    setTweetsInfos((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id ? { ...tweet, status: status } : tweet
      )
    );
    await updateTweetStatus(id, status);
  }

  return (
    <div className="space-y-2 w-[1200px]">
      <hr className="mt-5" />
      {tweetsInfos.map((tweetsInfo) => (
        <div key={tweetsInfo.id}>
          <div className="flex justify-around hover:bg-zinc-100 transition-colors duration-500 ease-in-out rounded-xl w-full items-center space-x-4 p-4 cursor-pointer">
            <div className="flex flex-col w-1/12 space-y-2 items-start">
              <AnimatedTooltip
                items={[
                  {
                    id: Number(tweetsInfo.id),
                    name: tweetsInfo.username,
                    designation: `@${tweetsInfo.handle}`,
                    image: tweetsInfo.profile,
                  },
                ]}
              />
            </div>

            <div className="flex flex-col w-6/12 space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <p className="text-start">{tweetsInfo.tweetContent}</p>
                    {tweetsInfo.images.slice(0, 1).map((image) => (
                      <Image
                        key={tweetsInfo.id}
                        src={image}
                        alt="Tweet Media"
                        width={200}
                        height={200}
                        className="rounded-lg object-contain max-h-64 w-[200px]"
                      />
                    ))}
                  </div>
                </DialogTrigger>
                <TweetModal tweet={tweetsInfo} />
              </Dialog>
            </div>

            <div className="flex w-3/12 flex-col justify-end items-end space-y-2">
              <DropDownMenus
                onApprove={() =>
                  handleApprovalChange(tweetsInfo.id, "approved")
                }
              />
              <div className="bg-zinc-500/10 h-10 px-4 py-2 border rounded-md font-medium text-xs">
                {tweetsInfo.status === "approved"
                  ? "Approved ✅"
                  : "Approval Pending... 🏳️"}
              </div>
            </div>
          </div>
          <hr className="mt-5" />
        </div>
      ))}
    </div>
  );
}

function DropDownMenus({ onApprove }: { onApprove: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="w-[120px] rounded-lg bg-gradient-to-b space-x-1 from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2">
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem>
          <SquareArrowOutUpRight className="mr-2" />
          Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowRightFromLine className="mr-2" />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onApprove}>
          <CheckCheck className="mr-2" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CircleSlash className="mr-2" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2Icon className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
