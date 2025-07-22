import { auth } from "../lib/auth.js";
import { createRouter } from "../lib/create-app.js";
import jwt from "jsonwebtoken";

export async function generatePKCE() {
    const codeVerifier = [...Array(128)]
        .map(() => Math.random().toString(36)[2])
        .join('');

    const base64url = (str: ArrayBuffer) =>
        Buffer.from(str)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = crypto.subtle ? await crypto.subtle.digest("SHA-256", data) : require("crypto").createHash("sha256").update(data).digest();

    const codeChallenge = base64url(digest);

    return { codeVerifier, codeChallenge };
}

const router = createRouter();

router.on(["POST", "GET"], "/auth/**", (c) => {
    return auth.handler(c.req.raw);
});

router.on(["POST", "GET"], "/auth/google", async (c) => {

    console.log(c.req.raw.body);

    // const res = await auth.api.signInSocial({
    //     body: {
    //         provider: "google",
    //         callbackURL: "http://localhost:3000/api/auth/callback/google",
    //         scopes: ["email", "profile"],

    //     }
    // });

    // console.log(res);

    const codeVerifier = await generatePKCE();

    const sampleuser = {
        id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://example.com/image.png",
    }


    const token = jwt.sign(sampleuser, process.env.JWT_SECRET! ?? 'secret', { expiresIn: "1h" });

    return c.json({
        login: true,
        token
    });
});

router.on(["POST", "GET"], "/auth/callback/google", async (c) => {
    const url = new URL(c.req.raw.url, `http://${c.req.raw.headers.host}`);
    const code = url.searchParams.get("code");
    const codeVerifier = await generatePKCE();

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code!,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: 'http://localhost:3000/api/auth/callback/google',
            grant_type: 'authorization_code',
            code_verifier: codeVerifier.codeVerifier,
        }),
    });

    const tokens = await tokenRes.json();

    console.log(tokens);

    // Now use id_token
    const res = await auth.api.signInSocial({
        body: {
            provider: "google",
            idToken: {
                token: tokens.id_token,
            },
        },
    });

    console.log(res);
    return c.redirect("http://localhost:3001");
});



export default router; 