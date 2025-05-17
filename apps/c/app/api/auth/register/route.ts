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
            return NextResponse.json({ msg: "user already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newuser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ msg: "user registered successfully" }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ msg: "Internal Server Error", error }, { status: 500 })
    }




}