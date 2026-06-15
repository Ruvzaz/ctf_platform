"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addReaction } from "@/lib/actions";

interface ReactionButtonsProps {
  articleDocumentId: string;
  initialLikes?: number;
  initialHearts?: number;
}

export function ReactionButtons({ articleDocumentId, initialLikes = 0, initialHearts = 0 }: ReactionButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hearts, setHearts] = useState(initialHearts);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasHearted, setHasHearted] = useState(false);

  const handleHeart = async () => {
    if (hasHearted) return;
    
    // อัปเดต UI ทันทีให้ผู้ใช้รู้สึกว่าเว็บตอบสนองไว (Optimistic UI)
    setHearts(prev => prev + 1);
    setHasHearted(true);
    
    // ส่งข้อมูลไปเซฟใน Strapi ผ่าน Server Action
    await addReaction(articleDocumentId, "hearts");
  };

  const handleLike = async () => {
    if (hasLiked) return;
    
    setLikes(prev => prev + 1);
    setHasLiked(true);
    
    // ส่งข้อมูลไปเซฟใน Strapi ผ่าน Server Action
    await addReaction(articleDocumentId, "likes");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* ปุ่ม Heart */}
      <Button 
        variant={hasHearted ? "secondary" : "primary"} 
        onClick={handleHeart}
        className={`w-full justify-center !font-mono !text-xs !py-4 flex gap-3 text-lg border-2 border-primary transition-all duration-200 ${
          hasHearted 
            ? 'bg-surface-dim text-primary border-dashed' 
            : 'hover:-translate-y-1 shadow-[4px_4px_0_0_var(--color-primary)]'
        }`}
      >
        <span className={hasHearted ? "text-primary" : "text-secondary text-base"}>
          {hasHearted ? "❤️" : "🤍"}
        </span> 
        {hasHearted ? "HEART_RECEIVED" : "SEND_HEART"} 
        <span className="ml-1 font-bold text-primary bg-white px-2 py-0.5 border border-primary">
          {hearts}
        </span>
      </Button>
      
      {/* ปุ่ม Like (ปรับสไตล์ให้ดูต่างกันนิดหน่อยเพื่อเป็นทางเลือก) */}
      <Button 
        variant="secondary"
        onClick={handleLike}
        className={`w-full justify-center !font-mono !text-xs !py-4 flex gap-3 text-lg border-2 border-primary transition-all duration-200 ${
          hasLiked 
            ? 'bg-primary text-white shadow-none translate-y-1' 
            : 'bg-white text-primary hover:bg-surface-dim shadow-[4px_4px_0_0_var(--color-primary)] hover:-translate-y-1'
        }`}
      >
        <span className={hasLiked ? "text-secondary" : "text-secondary text-base"}>👍</span> 
        {hasLiked ? "INTEL_ENDORSED" : "ENDORSE_INTEL"}
        <span className="ml-1 font-bold bg-primary text-white px-2 py-0.5 border border-primary">
          {likes}
        </span>
      </Button>
    </div>
  );
}
