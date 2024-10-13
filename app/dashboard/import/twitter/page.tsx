"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useTweet } from "react-tweet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { XIcon } from "lucide-react";


export default function TwitterInt() {
  return <TwitterForm />;
}

function TwitterForm() {
  const [tweetUrl, setTweetUrl] = useState("");
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [tweetContent, setTweetContent] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [userImage, setUserImage] = useState<string | ArrayBuffer | null>(null);
  const [mediaFile, setMediaFile] = useState<string | null>(null);

  const { data: tweet, isLoading, error } = useTweet(tweetUrl);

  console.log(tweet);

  function getTweetId(url: string) {
    const regex = /\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function preAddDetails() {
    if (tweet) {
      setUsername(tweet.user.name);
      setHandle(tweet.user.screen_name);
      setTweetContent(tweet.text);
      setIsVerified(tweet.user.is_blue_verified || false);
      setUserImage(tweet.user.profile_image_url_https);
      setMediaFile(tweet.mediaDetails[0].media_url_https);
    }
  }

  console.log(mediaFile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[1100px] space-y-5">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Import Tweet
      </h1>
      <div className="bg-teal-50 border border-teal-100 mt-7 p-5 rounded-lg">
        <div className="mb-4">
          <h2 className="text-base font-semibold">Pre-fill information</h2>
          <p className="text-sm text-gray-600">
            Paste a tweet URL to pre-fill information.
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <Input
            placeholder="https://twitter.com/user/status/1234567890"
            className="flex-grow bg-white h-10 px-3"
            onChange={(e) => {
              const tweetId = getTweetId(e.target.value);
              tweetId ? setTweetUrl(tweetId) : "";
            }}
            required
          />
          <Button
            className="bg-teal-900 text-white hover:bg-teal-800 h-10 px-4"
            onClick={preAddDetails}
          >
            Pre-fill Tweet
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Profile Picture</h2>
          <p className="text-sm text-gray-600">Author avatar picture.</p>
        </div>
        <div className="w-3/4">
          <Label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {userImage ? (
                <Avatar>
                  <AvatarImage
                    src={userImage}
                    alt="Uploaded Image"
                    className="object-contain"
                  />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              ) : (
                <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
              )}
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Label>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">User Information</h2>
          <p className="text-sm text-gray-600">
            Author name and twitter handle.
          </p>
        </div>
        <div className="w-3/4 space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Sidharth Babu"
              type="text"
              id="username"
              className="h-10 w-full"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <Label htmlFor="handle">Handle</Label>
            <Input
              placeholder="@Sidharth Babu"
              type="text"
              id="handle"
              className="h-10 w-full"
              onChange={(e) => setHandle(e.target.value)}
              value={handle}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Tweet Content</h2>
        </div>
        <div className="w-3/4">
          <Textarea
            placeholder="Enter tweet content here..."
            className="h-[200px] w-full"
            onChange={(e) => setTweetContent(e.target.value)}
            value={tweetContent}
          />
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Settings</h2>
        </div>
        <div className="w-3/4">
          <div className="flex items-center space-x-2">
            <Switch
              id="verification"
              checked={isVerified}
              onCheckedChange={setIsVerified}
            />
            <Label htmlFor="verification">Verification badge</Label>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Image</h2>
          <p className="text-sm text-gray-600">
            Images to display in the tweet.
          </p>
        </div>
        {mediaFile ? <TweetImage mediaFile={mediaFile} /> : <NonTweetImage />}
      </div>
      <hr />
      <div className="flex space-x-2 justify-end">
        <Button className="hover:bg-red-500">Reset</Button>
        <Button>Import Tweet</Button>
      </div>
    </div>
  );
}

function NonTweetImage() {
  return (
    <div className="w-3/4">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </Label>
    </div>
  );
}
function TweetImage({ mediaFile }: { mediaFile: string }) {
  return (
    <div className="w-3/4 flex flex-row space-x-2">
      
        <div className="relative w-40 h-40 border border-gray-900 flex items-center justify-center rounded-xl  bg-gray-900">
          <Image
            src={mediaFile}
            alt="user content"
            layout="fill"
            objectFit="contain"
            className="p-2"
           
            
          />
          <XIcon className="absolute top-1 right-1 w-5 h-5 text-white cursor-pointer" />
        </div>
     
        <Label
          htmlFor="dropzone-file"
          className="w-40 h-40 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
        >
          <span className="text-gray-400"><ImagePlus/></span>
        </Label>
     
    </div>
  );
}
