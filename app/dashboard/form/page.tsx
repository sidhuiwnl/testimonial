import {CopyIcon} from "lucide-react";

export default function Form(){
    return (
        <div>
            <h1 className='text-4xl font-semibold tracking-tight'>Your Collections</h1>
            <p className="font-medium mt-2 text-zinc-600 antialiased">Share your link with people to collect reviews.</p>
            <p className="mt-7 font-medium text-neutral-600">Your Link:</p>
            <p className="flex flex-row items-center space-x-2">
                <span className="text-teal-700 font-medium">https://testimonial-vert.vercel.app/sidharth/review</span>
                <CopyIcon width={15} height={15} className="cursor-pointer " />
            </p>
        </div>
    )
}