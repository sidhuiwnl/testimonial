import Link from "next/link";
import { Button } from "./ui/button";

export default function HomeBar(){
    return(
        <div className="w-screen border flex justify-around p-2 items-center">
            <div className="underline text-sm">
                Testimonial
            </div>
            <div className="space-x-3">
                <Link href={"/"} className="text-sm">Sign out</Link>
                <Link href={"/dashboard/reviews"}>
                
                <Button 
                className="bg-teal-800 hover:bg-teal-800"
                >Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}