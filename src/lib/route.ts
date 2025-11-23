import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const filePath = path.join(process.cwd(), '@/data/books.json');
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
