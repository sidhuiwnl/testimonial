"use client"

import EmailTemplate from "@/components/ui/EmailTemplate";
import {useSession} from "@/app/lib/auth-client";
import getTemplates from "@/app/actions/action";
import {Suspense} from "react";
import {Templates} from "@prisma/client";


export default function EmailSection() {
    const session = useSession();
    const userId = session?.data?.user.id

    const templates : Promise<Templates[]>  = getTemplates(userId!);




    return(
        <div>
            <h1 className="text-4xl font-semibold tracking-tight">Invite Others To Review</h1>
            <p className="font-medium mt-2 text-zinc-600 antialiased">Create and manage email templates, then send them manually or schedule automated delivery.</p>
            <div className="mt-10 flex flex-col space-y-20">
                <h1>Email Templates</h1>
                <Suspense fallback={<div>...Loading</div>}>
                    <EmailTemplate templates={templates} />
                </Suspense>

            </div>
        </div>
    )
}

