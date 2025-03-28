import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    const _headers = await headers();
    const _cookies = await cookies();

    const authorization = _headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json(
            { error: "No Authorization Header" },
            { status: 401 }
    );
    }

    const token = authorization?.split("Bearer ")[1];
    if (!token) {
        return NextResponse.json({ error: "No Token" }, { status: 401 });
    }

    const decodedToken = await auth().verifyIdToken(token);
    console.log("Decoded Token: ", decodedToken);
    if (!decodedToken) {
        return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const newToken = await auth().createCustomToken(
        decodedToken.uid, { expiresIn }
    );
    
    const options = {
        name: "access_token",
        value: token,
        maxAge: expiresIn,
        httpOnly: true,
        secure: false,
    };
    _cookies.set(options);

    return NextResponse.json({}, { status: 200 });
};