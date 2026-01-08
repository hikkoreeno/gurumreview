"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/components/shared/star-rating";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface ReviewListProps {
  reviews: Review[];
}

const avatarColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-muted/30 rounded-lg"
      >
        <div className="text-4xl mb-3">💬</div>
        <p className="text-muted-foreground">
          まだレビューがありません。最初のレビューを投稿しましょう！
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="flex gap-4 p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
            <Avatar className={getAvatarColor(review.authorName)}>
              <AvatarFallback className="text-white font-semibold">
                {review.authorName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.authorName}</span>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                    locale: ja,
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {review.comment}
              </p>
            </div>
          </div>
          {index < reviews.length - 1 && <Separator className="my-4" />}
        </motion.div>
      ))}
    </div>
  );
}
