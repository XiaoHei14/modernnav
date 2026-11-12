
import { NextResponse } from "next/server";

let cachedAccessToken = "";
let tokenExpiresAt = 0;

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  const offline = () =>
    NextResponse.json(
      { isPlaying: false },
      { headers: { "Cache-Control": "no-store" } }
    );

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json(
      { error: "Missing Spotify environment variables" },
      { status: 500 }
    );
  }

  try {
    // Reuse the access token until shortly before expiry.
    async function getAccessToken(forceRefresh = false) {
      if (
        !forceRefresh &&
        cachedAccessToken &&
        Date.now() < tokenExpiresAt - 60000
      ) {
        return cachedAccessToken;
      }

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
            refresh_token: refreshToken!,
          }),
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.access_token) {
        throw new Error("Spotify token refresh failed");
      }

      cachedAccessToken = data.access_token;
      tokenExpiresAt = Date.now() + data.expires_in * 1000;

      return cachedAccessToken;
    }

    async function getCurrentlyPlaying(accessToken: string) {
      return fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        }
      );
    }

    let accessToken = await getAccessToken();
    let response = await getCurrentlyPlaying(accessToken);

    // Retry once if the cached token was rejected.
    if (response.status === 401) {
      accessToken = await getAccessToken(true);
      response = await getCurrentlyPlaying(accessToken);
    }

    // Spotify returns 204 when nothing is playing.
    if (response.status === 204 || response.status === 404) {
      return offline();
    }

    if (!response.ok) {
      console.error("Spotify playback API:", response.status);
      return offline();
    }

    const data = await response.json();

    if (!data.is_playing || !data.item) {
      return offline();
    }

    const track = data.item;

    return NextResponse.json(
      {
        isPlaying: true,
        title: track.name,
        artist: track.artists
          ?.map((artist: { name: string }) => artist.name)
          .join(", "),
        albumImageUrl: track.album?.images?.[0]?.url ?? null,
        songUrl: track.external_urls?.spotify ?? null,
        progressMs: data.progress_ms,
        durationMs: track.duration_ms,
      },
      {
        headers: {
          "Cache-Control": "no-store, private",
        },
      }
    );
  } catch (error) {
    console.error("Spotify API error:", error);
    return offline();
  }
}
