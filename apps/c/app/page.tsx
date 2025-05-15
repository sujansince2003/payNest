"use client";
import Alert from "@repo/ui/alert";

export default function Home() {
  async function getUsers() {
    const users = await fetch("/api/user");
    const userjson = await users.json();
    console.log(userjson);
  }

  return (
    <div>
      <Alert />
      <button onClick={() => getUsers()}>Get Users</button>
    </div>
  );
}
