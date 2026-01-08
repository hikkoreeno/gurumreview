import { Suspense } from "react";
import { getShops } from "@/actions/shop";
import { ShopList } from "@/components/shops/shop-list";
import { SearchBox } from "@/components/shops/search-box";
import { Skeleton } from "@/components/ui/skeleton";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

function ShopListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ShopListWrapper({ query }: { query?: string }) {
  const shops = await getShops(query);
  return <ShopList shops={shops} />;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
          美味しいお店を見つけよう
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          地域のグルメスポットを探索し、お気に入りのお店を共有しましょう。
          <br />
          あなたのレビューが誰かの素敵な食体験につながります。
        </p>
      </section>

      <Suspense fallback={null}>
        <SearchBox />
      </Suspense>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {q ? `「${q}」の検索結果` : "店舗一覧"}
          </h2>
        </div>
        <Suspense fallback={<ShopListSkeleton />}>
          <ShopListWrapper query={q} />
        </Suspense>
      </section>
    </div>
  );
}
