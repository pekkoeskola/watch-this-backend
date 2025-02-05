# WatchThis!

## Idea

A relatively simple app to help curate watchlists for a group watching movies together, which allows users to rank which movies they most want to see and based on that, the app ranks the movies for the group to watch together.

## Architecture

React Frontend

REST API backend with Expressjs and Node.js, communicating with a PostgreSQL db via PrismaORM + Valkey cache

## Testing locally in development

You need node v22 and docker desktop to run the full local development environment. Currently starting up the dbs is its own npm script `npm run dev-db-up` (and `npm run dev-db-down` to wind down). 
Run the following to start up the dev environment:
```
npm install
npm run dev-db-up
npm run dev
```

## Running in production

There is currently no automated production build setup (not all envs are configured properly for example).