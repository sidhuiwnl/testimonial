"use client"

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";
import {BeerIcon, ArrowLeft} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {Placeholders} from "@/app/constants/template";
import Link from "next/link";

export default function Page() {
    const searchParams = useSearchParams();
    const content = searchParams.get("content");
    const subject = searchParams.get("subject");
    return (
        <div className="flex justify-center items-center py-24">
            <Card className="flex flex-col w-[800px] rounded-lg overflow-hidden shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-2 bg-neutral-800 px-4 py-2">
                    <div className="bg-red-500 h-3.5 w-3.5 mt-1.5 rounded-full flex-shrink-0"></div>
                    <div className="bg-yellow-400 h-3.5 w-3.5 rounded-full flex-shrink-0"></div>
                    <div className="bg-green-400 h-3.5 w-3.5 rounded-full flex-shrink-0"></div>
                    <div className="flex-grow"></div>
                    <p className="font-medium text-neutral-300">Email Template Preview</p>
                    <div className="flex-grow"></div>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex items-center space-x-2 px-4 py-4  border-b border-b-neutral-300 bg-neutral-100">
                        <Label className="text-neutral-500">subject:</Label>
                        <Input
                            value={subject!}
                            type={"text"}
                            placeholder={"Enter Subject..."}
                            className="border-none placeholder:text-neutral-800 font-medium focus:outline-none shadow-none"
                        />
                    </div>
                    <div className="min-h-[300px] relative p-4 rounded-lg">
                        <div
                            role="textbox"
                            className="focus:outline-none"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                        >
                            {content}
                        </div>
                        <Button
                            className="bg-neutral-800 hover:bg-neutral-700 absolute w-[500px] h-12 bottom-4 left-1/2 transform -translate-x-1/2 "
                        >
                            Write a Review 👉</Button>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}


export function TemplateSidebar(){
    return(
        <Sidebar >
            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="underline text-black  mb-3">
                        <BeerIcon className="mr-2 " />
                        Testimonial
                    </SidebarGroupLabel>
                    <Link
                        href="/dashboard/invite"
                        className="text-sm flex items-center space-x-2 mt-5"
                    >
                        <ArrowLeft width={20} height={20} />
                        <span className="font-medium">Back</span>
                    </Link>
                    <SidebarGroupContent className="mt-20">

                        <SidebarMenu className="flex items-center space-y-6">
                            {Placeholders.map((item, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <Label>{item.label}</Label>
                                    {item.component}
                                    <p className="text-sm text-gray-500">{item.metadata}</p>
                                </div>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-10">
                <Button>Save Template</Button>
            </SidebarFooter>
        </Sidebar>
    )
}