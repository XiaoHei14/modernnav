
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const savedState = request.cookies.get(
    "spotify_oauth_state"
  )?.value;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const responseHeaders = {
    "Cache-Control": "no-store, private",
    "Pragma": "no-cache",
  };

  if (error) {
    return NextResponse.json(
      { error: "Spotify authorization denied", detail: error },
      { status: 400, headers: responseHeaders }
    );
  }

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.json(
      { error: "Invalid OAuth state or missing code" },
      { status: 400, headers: responseHeaders }
    );
  }

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Spotify configuration missing" },
      { status: 500, headers: responseHeaders }
    );
  }

  try {
    const credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
        cache: "no-store",
      }
    );

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Spotify token exchange failed:", data);

      return NextResponse.json(
        { error: "Spotify token exchange failed" },
        { status: tokenResponse.status, headers: responseHeaders }
      );
    }

    const result = NextResponse.json(
      {
        success: true,
        message: "Spotify authorization successful",
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        scope: data.scope,
      },
      { headers: responseHeaders }
    );

    result.cookies.delete("spotify_oauth_state");

    return result;
  } catch (error) {
    console.error("Spotify callback error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: responseHeaders }
    );
  }
}
