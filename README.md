This is a [Next.js](https://nextjs.org/) Virtual Wallet Application project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Create an account [MongoDB](https://www.mongodb.com/products/platform/cloud) to use database services on cloud.

## Getting Started
First, install all the necessary dependencies:

```bash
npm i
```

Second, create a .env.local file and paste in the following:

```bash
MONGO_USERNAME = YOUR_USERNAME
MONGO_PASSWORD = YOUR_PASSWORD
MONGO_CLUSTER = YOUR_CLUSTER

NEXTAUTH_SECRET = SECURE_KEY
NEXTAUTH_URL = http://localhost:3000
```

Replace 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_CLUSTER', 'NEXTAUTH_SECRET' with your credentials.

Third, update 'MONGO_URI' with your database connection URI at 'libs\database\connectToDB.tsx':

```bash
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.olb4npa.mongodb.net/your_database_name`
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  

## Database Structure

You can see all the necessary data types for wallets, users and transactions at 'libs\models'.




