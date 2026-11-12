import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  
  // 必須與 Spotify Dashboard 填寫的 Redirect URI 100% 吻合
  const REDIRECT_URI = 'https://localhost:3000'; // 如果你是用線上網址就改成 'https://link.daohui.site'

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();

  if (data.refresh_token) {
    console.log('\n========================================');
    console.log('🎉 成功取得 Refresh Token！');
    console.log(data.refresh_token);
    console.log('========================================\n');
  } else {
    console.log('Error getting token:', data);
  }

  return new Response(
    `<h1>授權成功！</h1><p>請回來看你的終端機（Terminal），Refresh Token 已經印在上面了。</p>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}