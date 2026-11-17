# Notes API

Express and MongoDB REST API for managing notes. The API supports filtering by
tag and text, pagination, and request validation with Celebrate.

## Run locally

1. Copy `.env.example` to `.env` and set `MONGO_URL` to a reachable MongoDB
	 connection string. `PORT` defaults to `3030`.
2. Install dependencies with `npm install`.
3. Start the server with `npm run dev` or `npm start`.

## Endpoints

- `GET /notes?page=1&perPage=10&tag=Todo&search=hello`
- `GET /notes/:noteId`
- `POST /notes` with a JSON body containing `title`, and optionally `content`
	and `tag`
- `PATCH /notes/:noteId` with at least one of `title`, `content`, or `tag`
- `DELETE /notes/:noteId`

For Render, create a Web Service from this repository, use `npm start` as the
start command, and set `MONGO_URL` in the service environment. Render provides
`PORT` automatically.