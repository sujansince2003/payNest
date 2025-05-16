import prisma from "@repo/db/client";
import express, { Request, Response } from "express"
import { z } from "zod"
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req: Request, res: Response) => {
    res.json({ "msg": "get request test" })
})

const paymentInformationSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string()
})

app.post("/hdfcwebhook", async (req, res) => {

    const reqBody = req.body;
    const parsedData = paymentInformationSchema.safeParse(reqBody)
    if (!parsedData.success) {
        res.json({ msg: "Invalid request or validation failed" })
        return;
    }

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: parsedData.data.token,
        userId: parsedData.data.user_identifier,
        amount: parsedData.data.amount
    };


    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),

            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "success"
                }
            })

        ])
        res.json({ msg: "Transaction succeed" });
        return;

    } catch (error) {
        res.json({ msg: "failed to perform the transaction" })
        return;
    }
})




app.listen(8000, () => {
    console.log("BACKEND SERVER RUNNING ")
})