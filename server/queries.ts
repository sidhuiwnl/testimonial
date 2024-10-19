"use server";

import { client } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function addTweet({
  username,
  handle,
  tweetContent,
  isVerified,
  userImage,
  mediaFiles,
}: {
  username: string;
  handle: string;
  tweetContent: string;
  isVerified: boolean;
  userImage: string;
  mediaFiles: string[];
}) {
  const { user } = await validateRequest();

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
        userId: user?.id,
        id: JSON.stringify(Math.floor(Math.random() * 100000)),
        createdAt: new Date(),
        images: mediaFiles,
      },
    });

    
    redirect("/dashboard/reviews")
  }
 
}

export async function updateTweetStatus(id : string,status : string){
  return await client.tweetReview.update({
    where : {
      id : id
    },
    data : {
      status : status
    }
  })
}

export async function deleteReview(id : string){
 
  return await client.tweetReview.delete({
    where : {
      id : id
    }
  })
}

export async function getReviews(userId: string | undefined) {
  const { user } = await validateRequest();
  if (!user) {
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
