import { useState } from "react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  className?: string;
}

export default function LikeButton({
  initialLiked = false,
  onToggle,
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    const newState = !liked;
    setLiked(newState);
    setIsAnimating(true);
    if (onToggle) onToggle(newState);
  };

  return (
    <div
      className={cn(
        "relative w-12.5 h-12.5 flex items-center justify-center cursor-pointer",
        className,
      )}
      onClick={handleClick}
    >
      <style>{`
        @keyframes heart-burst {
          0% { background-position: left; }
          100% { background-position: right; }
        }
        .heart-anim {
          background-image: url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
          background-repeat: no-repeat;
          background-size: 2900%;
          height: 100%;
          width: 100%;
        }
        .animate-burst {
          animation: heart-burst 0.8s steps(28) forwards;
        }
      `}</style>

      <div
        className={cn(
          "heart-anim absolute top-0 left-0",
          liked && isAnimating ? "animate-burst" : "",
        )}
        style={{
          backgroundPosition: liked && !isAnimating ? "right" : "left",
        }}
      />
    </div>
  );
}
