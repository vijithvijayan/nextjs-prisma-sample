This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- After cloning this repo put these in local .env

  ```
  DATABASE_URL='mysql://root@localhost:2209/rounded-pokemon'
  SHADOW_URL='mysql://root@localhost:2210/rounded-pokemon'
  ```

- setup `planetscale.com`
  ```
  - create free plan account and create db `rounded-pokemon`
  - go to databse and create branch `dev`
  - install pscale `brew install planetscale/tap/pscale`
  - run `pscale auth login` follow the steps in console
  - run `pscale connect rounded-pokemon main --port 2209`
  - run `pscale connect rounded-pokemon dev --port 2210`
  ```
- run `npx prisma migrate dev`

- run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```

- Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
