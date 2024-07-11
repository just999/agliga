import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

const RSS_URL = 'https://www.dailymail.co.uk/articles.rss'; // Replace with your actual RSS feed URL

export async function GET() {
  try {
    const feed = await parser.parseURL(RSS_URL);
    const items = feed.items?.slice(0, 5); // Limit to first 5 items
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}
