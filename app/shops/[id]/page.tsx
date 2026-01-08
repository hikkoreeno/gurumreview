import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, MessageSquare } from "lucide-react";
import { getShopById } from "@/actions/shop";
import { StarRating } from "@/components/shared/star-rating";
import { ReviewList } from "@/components/reviews/review-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface ShopDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
  const { id } = await params;
  const shop = await getShopById(id);

  if (!shop) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        店舗一覧に戻る
      </Link>

      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-primary via-orange-500 to-amber-500" />
        <CardHeader className="space-y-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">{shop.name}</CardTitle>
              {shop.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(shop.createdAt), "yyyy年M月d日", {
                    locale: ja,
                  })}
                  に登録
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              {shop.averageRating !== null ? (
                <>
                  <Badge
                    variant="secondary"
                    className="text-lg px-4 py-1 bg-primary/10 text-primary border-0"
                  >
                    ★ {shop.averageRating.toFixed(1)}
                  </Badge>
                  <StarRating rating={shop.averageRating} size="md" />
                </>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  評価なし
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {shop.description && (
            <>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {shop.description}
                </p>
              </div>
              <Separator />
            </>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">
                レビュー ({shop.reviewCount}件)
              </h2>
            </div>
            <ReviewForm shopId={shop.id} />
          </div>

          <ReviewList reviews={shop.reviews} />
        </CardContent>
      </Card>
    </div>
  );
}
