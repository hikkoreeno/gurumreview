"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, Store, MapPin, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createShop } from "@/actions/shop";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const shopSchema = z.object({
  name: z.string().min(1, "店舗名は必須です"),
  description: z.string().optional(),
  location: z.string().optional(),
});

type ShopFormValues = z.infer<typeof shopSchema>;

export default function NewShopPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ShopFormValues>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  });

  async function onSubmit(values: ShopFormValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("location", values.location || "");

    const result = await createShop(formData);

    if (result.success) {
      toast({
        title: "店舗を登録しました！",
        description: "新しい店舗が正常に登録されました。",
      });
      router.push(`/shops/${result.shopId}`);
    } else {
      toast({
        title: "エラーが発生しました",
        description: "入力内容を確認してください。",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          トップページに戻る
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">新規店舗登録</CardTitle>
                <CardDescription>
                  新しいお店の情報を登録しましょう
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        店舗名 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例: 麺屋 太郎"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        場所・エリア
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例: 東京都渋谷区道玄坂1-2-3"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        住所やエリア名を入力してください
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        店舗の説明
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例: 創業30年の老舗ラーメン店。自家製麺と濃厚豚骨スープが自慢です。"
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        お店の特徴や雰囲気を紹介してください
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    キャンセル
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2 shadow-lg shadow-primary/25"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Store className="h-4 w-4" />
                    )}
                    登録する
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
