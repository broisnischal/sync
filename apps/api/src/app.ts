// import { serveStatic } from "hono/bun";

import createApp from "./lib/create-app.js";
import auth from "./routes/auth.js";

const app = createApp();

const routes = [auth] as const;

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

routes.forEach((route) => {
    app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;