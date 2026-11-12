
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Protect this endpoint with a server-side secret.
  const expectedSecret = process.env.SPOTIFY_API_SECRET;
  const suppliedSecret = request.headers.get("authorization");

  if (
    !expectedSecret ||
    suppliedSecret !== `Bearer ${expectedSecret}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(
      { error: "Spotify credentials missing" },
      { status: 500 }
    );
  }

  try {
    const credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Token refresh failed", detail: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      // Spotify may return a replacement refresh token.
      refresh_token: data.refresh_token ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
