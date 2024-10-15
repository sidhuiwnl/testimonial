import Review from "@/components/ReviewComponent"
import { validateRequest } from "@/lib/auth"

export default async function Reviews(){
    const { user } = await validateRequest();
    return(
       <div>
        <h1 className="text-4xl sm:text-5xl  font-semibold tracking-tight text-zinc-800">Your reviews</h1>
        <p className="font-medium mt-2 text-zinc-900 antialiased">Manage all your reviews in one place and approve the ones you like.</p>
        <Review userId={user?.id}/>
       </div>
    )
}