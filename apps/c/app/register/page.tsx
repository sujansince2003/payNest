"use client";

import { useState } from "react";
import React from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">username</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="username"
          type="text"
        />
        <label htmlFor="password">password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          id="password"
          type="text"
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Page;
