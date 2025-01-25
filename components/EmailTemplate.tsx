import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, PencilLine, ChevronDown, Trash2, Send, Code } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import getTemplates from "@/app/actions/action";
import { Templates } from "@prisma/client";

export default function EmailTemplate({ userId }: { userId: string }) {
    const pathname = usePathname();
    const [templates, setTemplates] = useState<Templates[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function templateData() {
        try {
            setIsLoading(true);
            const fetchedTemplates = await getTemplates(userId!);
            setTemplates(fetchedTemplates);
        } catch (error) {
            console.error("Failed to fetch templates:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        templateData();
    }, [userId]);


    const calculatePlaceholders = (template: Templates) => {

        return template.templateName.split('{{').length - 1;
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 animate-pulse">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-zinc-200 rounded-lg h-[290px]"></div>
                ))}
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-semibold text-zinc-700 mb-4">
                    No Email Templates Found
                </h2>
                <p className="text-zinc-500 mb-6">
                    Create your first email template to get started
                </p>
                <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
                    Create Template
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {templates.map((template) => (
                <Link
                    href={{
                        pathname: `${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}/template/${template.id}`,
                        query : { name : template.templateName,templateId: template.id }
                    }}
                    key={template.id}
                    className="group"

                >
                    <Card className="
                        w-full 
                        max-w-[350px] 
                        mx-auto 
                        min-h-[290px]
                        bg-neutral-200
                        border-zinc-200 
                        shadow-md 
                        hover:shadow-lg 
                        transition-all 
                        duration-300 
                        hover:-translate-y-2
                        group
                    ">
                        <CardHeader className="pb-2">
                            <h1 className="
                                font-bold 
                                text-xl 
                                text-zinc-900
                                truncate 
                                group-hover:text-zinc-700 
                                transition-colors
                            ">
                                {template.templateName}
                            </h1>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-4 p-4">
                            <div className="text-sm flex items-center space-x-2 text-zinc-600">
                                <Calendar className="w-4 h-4 text-zinc-500" />
                                <span>
                                    {new Date(template.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-500">
                                {calculatePlaceholders(template)} Placeholders
                            </p>
                            <hr className="border-zinc-200" />
                            <div className="flex flex-col space-y-2">
                                <Button
                                    className="
                                        w-full 
                                        h-10 
                                        flex 
                                        items-center 
                                        justify-center 
                                        gap-2 
                                        bg-zinc-800 
                                        text-white 
                                        hover:bg-zinc-700 
                                        transition-colors
                                    "
                                >
                                    <PencilLine className="w-4 h-4" />
                                    Edit Template
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="
                                                w-full 
                                                h-10 
                                                flex 
                                                items-center 
                                                justify-center 
                                                gap-2 
                                                bg-zinc-100 
                                                text-zinc-800 
                                                hover:bg-zinc-200 
                                                transition-colors
                                            "
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                            Actions
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[200px]">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Send className="mr-2 h-4 w-4" />
                                                Send
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Code className="mr-2 h-4 w-4" />
                                                Send via SDK
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}