# 💳 Paynest – A Modern Digital Wallet System

**Paynest** is a full-stack, scalable digital wallet system inspired by apps like PhonePe and Khalti. Users can load money from their bank, make purchases, and transfer money back to their accounts. Merchants can receive payments, manage transactions, and view earnings in real time.

---

## 📐 Architecture Overview

This project is built using a **Turborepo** monorepo structure and consists of:

- **`apps/user`** – Next.js frontend for users
- **`apps/merchant`** – Next.js frontend for merchants
- **`apps/api`** – Express.js backend handling:
  - External bank API callbacks/webhooks
  - Wallet load and transfer logic
  - Central business logic and database access
- **PostgreSQL** – Primary relational database
- **Prisma** – Type-safe ORM used across services

---

## 🔑 Key Features

- ✅ Load wallet with funds from a bank
- 🛒 Spend wallet balance for purchases
- 🔁 Transfer funds back to the bank
- 📜 View transaction history and balances
- 🧑‍💼 Merchant interface for payment tracking
- 🔐 Secure webhook support for bank APIs
- 🧠 Role-based access and session management

---

## 🧰 Tech Stack

| Layer            | Tech                               |
| ---------------- | ---------------------------------- |
| Frontend         | Next.js (App Router)               |
| Backend          | Express.js                         |
| Database         | PostgreSQL                         |
| ORM              | Prisma                             |
| Monorepo         | Turborepo                          |
| Auth (Pluggable) | Clerk / Auth.js / Auth0            |
| Validation       | Zod (recommended)                  |
| Queue System     | BullMQ (optional)                  |
| Deployment       | Vercel / Fly.io / Railway / Render |

---

## 📁 Folder Structure

/apps
/user → Next.js app for users
/merchant → Next.js app for merchants
/api → Express.js backend service

/packages
/db → Shared Prisma client & schema
/config → Shared config (TS, ESLint, etc.)
