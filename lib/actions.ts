"use server";

import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function addReaction(documentId: string, type: "likes" | "hearts") {
  if (!STRAPI_API_TOKEN || STRAPI_API_TOKEN === "your_secure_api_token_here") {
    // กรณีไม่มี Token (รัน Mock Data) ให้ถือว่าสำเร็จไปเลย
    return { success: true };
  }

  try {
    // 1. ดึงค่าเดิมของข่าวนี้มาก่อน เพราะ Strapi ไม่มี API สำหรับการบวกเลขตรงๆ
    const getRes = await fetch(`${API_URL}/api/articles/${documentId}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      cache: 'no-store'
    });

    if (!getRes.ok) throw new Error("Failed to fetch article for reaction");

    const getJson = await getRes.json();
    // รองรับโครงสร้างข้อมูลทั้งแบบ Strapi v4 และ v5
    const currentVal = getJson.data?.attributes?.[type] || getJson.data?.[type] || 0;
    
    // 2. บวกค่าเพิ่ม 1 แล้วส่ง PUT Request กลับไปอัปเดต
    const bodyData = {
      data: {
        [type]: currentVal + 1
      }
    };

    const putRes = await fetch(`${API_URL}/api/articles/${documentId}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData),
    });

    if (!putRes.ok) {
      console.error(await putRes.text());
      throw new Error(`Failed to update ${type}`);
    }

    // 3. ล้าง Cache ของหน้าเว็บ เพื่อให้คนอื่นเห็นยอดไลค์/หัวใจ อัปเดตด้วย
    revalidateTag("articles", "max");

    return { success: true };
  } catch (error) {
    console.error(`Error adding ${type}:`, error);
    return { success: false };
  }
}
