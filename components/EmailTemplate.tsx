"use client"

import getTemplates from "@/app/actions/action";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Calendar} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Templates} from "@prisma/client";
import {PencilLine,ChevronDown} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup, DropdownMenuShortcut, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function EmailTemplate({
    userId,
                                       } : {
    userId: string;
}) {

    const[templates, setTemplates] = useState<Templates[]>([])

    async function templateData(){
        const templates  = await getTemplates(userId!);
        setTemplates(templates);
    }

    useEffect(() => {
        templateData();
    }, [userId]);



    return(
        <div>
            {templates.map((template, ) => (
                <Card key={template.id} className="w-[300px] min-h-[200px] bg-zinc-100">
                    <CardHeader>
                        <h1 className="font-semibold">{template.templateName}</h1>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-3">
                        <p className="text-sm flex items-center space-x-1">
                            <Calendar width={15} height={15}/>
                            <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                        </p>
                        <p className="text-sm">3 placeholders</p>
                        <hr/>
                        <Button>
                            <PencilLine width={15} height={15} className="mr-2"/>
                            <span>Edit Template</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <ChevronDown width={15} height={15} className="mr-2"/>
                                    <span>Action</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Send
                                        <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Send via SDK
                                        <DropdownMenuShortcut>⇧⌘U</DropdownMenuShortcut>
                                    </DropdownMenuItem>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Delete
                                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}