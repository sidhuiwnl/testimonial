import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center py-24">
      <p className="text-sm text-green-700 font-semibold antialiased mb-5">
        SaaS Reviews in Seconds
      </p>
      <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center mb-4 ">
        Collect, Manage & Embed
      </h1>
      <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center ">
        High-Quality Reviews As Code
      </h1>
      <p className="text-sm max-w-3xl mt-9 text-slate-600 text-center mb-10">
        Gain full control of your brand&apos;s reputation with static, pre-optimized
        review components. Simply copy & paste to showcase compelling reviews on
        your site.
      </p>
      <Button className="relative bg-teal-700 w-[350px] h-[50px] text-white font-medium transition-shadow duration-300  ring-offset-2 hover:ring-2 hover:ring-teal-800 hover:bg-teal-800 overflow-hidden ">
        Start for free today
        <ChevronRight />
      </Button>
    </div>
  );
}
