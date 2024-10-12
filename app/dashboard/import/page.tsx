import Image from "next/image";
import tweet1 from "@/public/tweet1.png";
import { ChevronRight } from "lucide-react";

export default function ImportReview() {
  return (
    <div className="hover:cursor-pointer">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Import a review
      </h1>
      <p className="font-medium mt-2 text-zinc-600 antialiased">
        Bring your reviews from various social platforms into a single place.
      </p>
      <div className="relative mt-4 p-3 border-2 rounded-lg max-w-[400px] h-[300px] space-y-2 overflow-hidden group">
        <Image src={tweet1} className="rounded-sm" alt="twitter" />
        <h1 className="font-semibold text-gray-800 antialiased">Twitter 🎉</h1>
        <p className="text-sm font-medium text-gray-600">
          Import a review from Twitter 
        </p>

        
        <div className="absolute bottom-4 right-4 text-gray-500 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <ChevronRight />
        </div>
      </div>
    </div>
  );
}
