"use server"

import { client } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function addTweet({
  username,
  handle,
  tweetContent,
  isVerified,
  userImage,
}: {
  username: string;
  handle: string;
  tweetContent: string;
  isVerified: boolean;
  userImage: string;
}) {
  
    const { user } = await validateRequest();
  
    

    if(!user){
        console.error("Unauthoerized");

    }else{
        await client.tweetReview.create({
            data : {
              profile :   userImage,
              username : username,
              handle : handle,
              tweetContent : tweetContent,
              verified : isVerified,
              userId : user?.id,
              id : JSON.stringify(Math.floor(Math.random() * 100000))
            }
        })
    }
  
}


export async function getUserImages({ mediaFiles } : { mediaFiles : string[] }){
    const { user } = await validateRequest();
    if(!user){
        console.error("Unauthoerized");

    }else{
        mediaFiles.map(async (mediaFile) =>{
            await client.images.create({
                data : {
                    userId : user.id,
                    id : JSON.stringify(Math.floor(Math.random() * 100000)),
                    image : mediaFile
                }
            })
        })
    }

    redirect("/dashboard/reviews")


}

export async function getReviews(userId : string | undefined){
    const { user } = await validateRequest();
    if(!user){
        console.error("Unauthoerized");

    }else{
       const tweetsText =  await client.tweetReview.findMany({
            where : {
                userId : userId
            }
        })
        const tweetMedia = await client.images.findMany({
            where : {
                userId : userId
            }
        })

        return {
            tweetMedia,
            tweetsText
        }
    }
}