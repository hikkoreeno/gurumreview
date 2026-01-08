"use client";

import Link from "next/link";
import { Utensils, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Utensils className="h-7 w-7 text-primary" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
            グルメレビュー
          </span>
        </Link>
        <Link href="/shops/new">
          <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">店舗を登録</span>
          </Button>
        </Link>
      </div>
    </motion.header>
  );
}
