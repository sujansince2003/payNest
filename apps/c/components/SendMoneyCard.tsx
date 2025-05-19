"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { handleP2P } from "../lib/actions/sendMoney";

export function SendCard() {
  const [receiverMail, setreceiverMail] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Receiver mail"}
              label="Receiver mail"
              onChange={(value) => {
                setreceiverMail(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                amount={Number(amount)}
                onClick={async () => {
                  await handleP2P(Number(amount) * 100, receiverMail);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
