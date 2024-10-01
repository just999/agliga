// app/api/livescore/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const livescoreUrl =
  'https://freelive.7msport.com/live.aspx?mark=en&TimeZone=%2B0800&wordAd=&cpageBgColor=CCCCCC&wadurl=//&width=1004&tableFontSize=12&cborderColor=333333&ctdColor1=EEEEEE&ctdColor2=FFFFFF&clinkColor=0044DD&cdateFontColor=FFFFFF&cdateBgColor=333333&scoreFontSize=12&cteamFontColor=000000&cgoalFontColor=FF0000&cgoalBgColor=FFFF99&cremarkFontColor=000000&cremarkBgColor=F7F8F3&Skins=2&teamWeight=400&scoreWeight=700&goalWeight=700&fontWeight=700&DSTbox=';

export async function GET() {
  try {
    const response = await fetch(livescoreUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const htmlContent = await response.text();

    // Use cheerio to modify the HTML
    const $ = cheerio.load(htmlContent);

    // Remove scripts to avoid CSP issues
    $('script').remove();

    // Convert relative URLs to absolute
    $('a, img, link').each((i, elem) => {
      const attribs = ['href', 'src'];
      attribs.forEach((attr) => {
        const attrValue = $(elem).attr(attr);
        if (attrValue && !attrValue.startsWith('http')) {
          $(elem).attr(attr, `https://freelive.7msport.com${attrValue}`);
        }
      });
    });

    // Extract only the necessary content (e.g., the main table)
    const mainContent = $('#live_Table_main').html() || '';

    return NextResponse.json({ html: mainContent });
  } catch (error) {
    console.error('Error fetching livescore:', error);
    return NextResponse.json(
      { error: 'Error fetching livescore' },
      { status: 500 }
    );
  }
}
