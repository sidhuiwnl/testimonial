"use server";

import { client } from "@/app/lib/prisma";

import { redirect } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import { User } from "better-auth";

export async function addTweet({
  user,
  username,
  handle,
  tweetContent,
  isVerified,
  userImage,
  mediaFiles,
}: {
  user: User;
  username: string;
  handle: string;
  tweetContent: string;
  isVerified: boolean;
  userImage: string;
  mediaFiles: string[];
}) {
  if (!user) {
    console.error("Unauthorized");
  } else {
    await client.tweetReview.create({
      data: {
        profile: userImage,
        username: username,
        handle: handle,
        tweetContent: tweetContent,
        verified: isVerified,
        userId: user.id,
        id: JSON.stringify(Math.floor(Math.random() * 100000)),
        createdAt: new Date(),
        images: mediaFiles,
      },
    });

    redirect("/dashboard/reviews");
  }
}

export async function updateTweetStatus(id: string, status: string) {
  return await client.tweetReview.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
}

export async function deleteReview(id: string) {
  const session = useSession();
  await client.tweetReview.delete({
    where: {
      id: id,
    },
  });

  const updatedTweetInfo = await client.tweetReview.findMany({
    where: {
      userId: session.data?.user.id,
    },
  });

  if (updatedTweetInfo) {
    return updatedTweetInfo;
  } else {
    return [];
  }
}

export async function getReviews(userId: string | undefined) {
  if (!userId) {
    console.error("Unauthoerized");
  } else {
    const tweetsText = await client.tweetReview.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      tweetsText,
    };
  }
}
