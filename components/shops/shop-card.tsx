"use client";

import Link from "next/link";
import { MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/shared/star-rating";
import { motion } from "framer-motion";

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    description: string | null;
    location: string | null;
    reviewCount: number;
    averageRating: number | null;
  };
  index: number;
}

export function ShopCard({ shop, index }: ShopCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/shops/${shop.id}`}>
        <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/20 group cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                {shop.name}
              </CardTitle>
              {shop.averageRating !== null && (
                <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-0">
                  ★ {shop.averageRating.toFixed(1)}
                </Badge>
              )}
            </div>
            {shop.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{shop.location}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {shop.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {shop.description}
              </p>
            )}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{shop.reviewCount} 件のレビュー</span>
              </div>
              {shop.averageRating !== null && (
                <StarRating rating={shop.averageRating} size="sm" />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
