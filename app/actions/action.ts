"use server"

import {client} from "@/app/lib/prisma";
import {Templates} from "@prisma/client";

export default async function getTemplates(userId: string): Promise<Templates[]> {
    if (!userId) {
        return [];
    }

    try {
        const response = await client.templates.findMany({
            where: { userId }
        });

        return response;
    } catch(err) {
        console.error(err);
        return [];
    }
}