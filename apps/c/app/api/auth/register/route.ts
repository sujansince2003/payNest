import prisma from "@repo/db/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {


        const body = await req.json()

        const { email, password } = body

        const userExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (userExist) {
            return NextResponse.json({ msg: "user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newuser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ msg: "user registered successfully", newuser })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ msg: "error", error })
    }




}