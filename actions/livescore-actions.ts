'use  server';

import { NextResponse } from 'next/server';

const livescoreUrl =
  'https://freelive.7msport.com/live.aspx?mark=en&TimeZone=%2B0800&wordAd=&cpageBgColor=CCCCCC&wadurl=//&width=1004&tableFontSize=12&cborderColor=333333&ctdColor1=EEEEEE&ctdColor2=FFFFFF&clinkColor=0044DD&cdateFontColor=FFFFFF&cdateBgColor=333333&scoreFontSize=12&cteamFontColor=000000&cgoalFontColor=FF0000&cgoalBgColor=FFFF99&cremarkFontColor=000000&cremarkBgColor=F7F8F3&Skins=2&teamWeight=400&scoreWeight=700&goalWeight=700&fontWeight=700&DSTbox=';

export async function getLivescore(req?: Request) {
  try {
    const response = await fetch(livescoreUrl);
    const data = await response.text();
    return NextResponse.json({ html: data }); // Send HTML back to client
  } catch (error) {
    console.error('Error fetching livescore:', error);
    return NextResponse.json(
      { error: 'Error fetching livescore' },
      { status: 500 }
    );
  }
}
