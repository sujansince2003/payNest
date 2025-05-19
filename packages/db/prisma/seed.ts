import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'test1@gmail.com' },
        update: {},
        create: {
            email: 'test1@gmail.com',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "success",
                    amount: 20000,
                    token: "token__1",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'test2@gmail.com' },
        update: {},
        create: {
            email: 'test2@gmail.com',
            password: await bcrypt.hash('bob', 10),
            name: 'bob',
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "failure",
                    amount: 2000,
                    token: "token__2",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    console.log({ alice, bob })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })