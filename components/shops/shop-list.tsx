"use client";

import { ShopCard } from "./shop-card";
import { motion } from "framer-motion";

interface Shop {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  reviewCount: number;
  averageRating: number | null;
}

interface ShopListProps {
  shops: Shop[];
}

export function ShopList({ shops }: ShopListProps) {
  if (shops.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold mb-2">店舗が見つかりません</h3>
        <p className="text-muted-foreground">
          新しい店舗を登録してみましょう！
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop, index) => (
        <ShopCard key={shop.id} shop={shop} index={index} />
      ))}
    </div>
  );
}
