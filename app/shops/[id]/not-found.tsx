import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">店舗が見つかりません</h1>
        <p className="text-muted-foreground max-w-md">
          お探しの店舗は存在しないか、削除された可能性があります。
        </p>
      </div>
      <Link href="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          トップページに戻る
        </Button>
      </Link>
    </div>
  );
}
