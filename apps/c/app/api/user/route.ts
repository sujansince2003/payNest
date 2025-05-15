import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {

    const users = await prisma.user.findMany();
    return NextResponse.json({ msg: "hello", users })

}