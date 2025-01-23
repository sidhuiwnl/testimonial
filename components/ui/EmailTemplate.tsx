"use client"
import {Templates} from "@prisma/client";
import { use } from 'react'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Calendar} from "lucide-react";
import {Button} from "@/components/ui/button";

export default  function EmailTemplate({
    templates,
                                       } : {
    templates: Promise<Templates[]>;
}) {

    const allTemplates = use(templates);

    console.log(allTemplates);


    return(
        <div>
            {allTemplates.map((template, ) => (
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
                        <Button>Edit Template</Button>
                        <Button>Action</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}