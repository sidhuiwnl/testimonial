

export default function HeroSection() {
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col items-center py-24 dark:bg-black bg-white rounded-lg max-w-6xl w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>

        <p className="text-sm text-green-700 font-semibold antialiased mb-5">
          SaaS Reviews in Seconds
        </p>
        <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center mb-4">
          Collect, Manage & Embed
        </h1>
        <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center">
          High-Quality Reviews As Code.
        </h1>
        <p className="text-sm max-w-3xl mt-9 text-slate-600 text-center mb-10">
          Gain full control of your brand&apos;s reputation with static,
          pre-optimized review components. Simply copy & paste to showcase
          compelling reviews on your site.
        </p>
        
      </div>
    </div>
  );
}
