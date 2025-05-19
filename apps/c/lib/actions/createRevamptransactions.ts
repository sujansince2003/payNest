"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../authOptions"


export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    // in rwa the token should come from the bank 

    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "processing",
            startTime: new Date(),
            token: token,
            userId: Number(session.user.id),
            amount: amount * 100

        }
    })
    return {
        msg: "onRampTransaction created"
    }

}