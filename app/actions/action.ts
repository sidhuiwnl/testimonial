"use server"

import {client} from "@/app/lib/prisma";
import {Templates} from "@prisma/client";


export default async function getTemplates(userId: string): Promise<Templates[]> {
    if (!userId) {
        throw  new Error("The user found,Unauthorized");
    }

    try {
        const response = await client.templates.findMany({
            where: { userId }
        });

        return response;
    } catch(err) {
        console.error(err);
        throw new Error("An error occurred while fetching the templates")
    }
}

export async function updateTemplate(
    templateId: string | null,
    name : string | null,
    subject: string | null,
    content: string | null,
    userId: string | undefined,
) {


    if (!userId) {
        return {
            status: "error",
            message: "You don't have permission to update this page",
        };
    }

    if (!templateId) {
        return {
            status: "error",
            message: "There is no template to update",
        };
    }

    try {

        const currentUser = await client.user.findUnique({
            where: { id: userId },
        });

        if (!currentUser) {
            return {
                status: "error",
                message: "User not found or unauthorized",
            };
        }


        const updatedTemplate = await client.templates.update({
            where: {
                id: templateId,
                userId: currentUser.id, // Ensure template belongs to the user
            },
            data: {
                templateName: name!,
                subject : subject!,
                body: content!,
            },
        });

        return {
            status: "success",
            message: "Template updated successfully",
            template: updatedTemplate,
        };
    } catch (error) {
        console.error("Error updating template:",  error);
        return {
            status: "error",
            message: "An error occurred while updating the template",
        };
    }
}

// export async  function getTemplate(templateId: string) : Promise<Templates | null>{
//     if (!templateId) {
//         throw new Error("Template ID is required");
//     }
//
//     try {
//         const template = await client.templates.findUnique({
//             where: { id: templateId },
//         })
//
//         if(!template){
//             console.warn(`No template found for ID: ${templateId}`);
//         }
//
//         return template;
//     }catch(err) {
//         console.error(err);
//         throw new Error("An error occurred while fetching the template");
//     }
// }