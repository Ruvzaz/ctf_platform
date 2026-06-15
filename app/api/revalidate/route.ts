import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // ตรวจสอบ Secret Token เพื่อป้องกันคนนอกยิง API เข้ามารีเซ็ต Cache มั่วๆ
    const authHeader = request.headers.get("authorization");
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

    // ถ้าตั้งค่า REVALIDATE_SECRET ไว้ใน .env จะทำการเช็กความปลอดภัย
    if (REVALIDATE_SECRET && authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // สั่งให้ Next.js ล้าง Cache เฉพาะข้อมูลที่มี Tag ว่า 'articles' ทันที
    // Next.js เวอร์ชันใหม่บังคับให้ใส่ parameter ตัวที่สองเป็น "max" สำหรับ Route Handler
    revalidateTag("articles", "max");

    return NextResponse.json({ 
      revalidated: true, 
      message: "Cache cleared successfully",
      now: Date.now() 
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
