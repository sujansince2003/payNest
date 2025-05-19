// handles peer to peer transactions i.e transfer between the accounts of the application
"use server";

import prisma from "@repo/db/client";
import { authOptions } from "../authOptions";
import { getServerSession } from "next-auth";

export async function handleP2P(amount: number, receiverEmail: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      msg: "unauthenticated request",
    };
  }
  const receiverAccount = await prisma.user.findUnique({
    where: {
      email: receiverEmail,
    },
  });

  if (!receiverAccount) {
    return {
      msg: "receiver doesnot exist",
    };
  }

  if (Number(receiverAccount.id) === Number(session.user.id)) {
    return {
      msg: "you cannot send money to yourself",

    };
  }
  try {
    await prisma.$transaction(async (transactionClient) => {

      // locking the balance so that the multiple requests are handled sequentially(one by one)
      await transactionClient.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;

      const availabeAmt = await transactionClient.balance.findFirst({
        where: {
          userId: Number(session.user.id),
        },
      });
      if (!availabeAmt) {
        throw new Error("Sender has no balance record")
      }

      if (availabeAmt && availabeAmt?.amount < amount) {
        throw new Error("Insufficient balance");

      }
      await transactionClient.balance.update({
        where: {
          userId: Number(session.user.id),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await transactionClient.balance.update({
        where: {
          userId: receiverAccount.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
    });
    return {
      msg: `Successfully transfered to ${receiverAccount.email}  `
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return { msg: error && error.message || "Something went wrong" };
    }
    else {
      return { msg: "Something went wrong" }
    }
  }
}
