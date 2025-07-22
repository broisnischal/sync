import { serve } from '@hono/node-server'
import app from './app.js'

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });

//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     return next();
//   }

//   c.set("user", session.user);
//   c.set("session", session.session);
//   return next();
// });

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
