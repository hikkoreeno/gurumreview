# グルメレビュー

誰でも店舗の登録・閲覧・レビュー投稿ができる掲示板形式のグルメサイトです。

## 技術スタック

- **Frontend**: Next.js 15 (App Router), TypeScript
- **Backend**: Next.js Server Actions
- **Database**: SQLite (Prisma ORM)
- **UI**: Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons
- **Animation**: Framer Motion

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Prismaのセットアップ

```bash
# Prismaクライアントを生成
npx prisma generate

# データベースをセットアップ
npx prisma db push

# サンプルデータを投入（オプション）
npx tsx prisma/seed.ts
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 機能

- **店舗一覧**: 登録されている店舗をカード形式で一覧表示
- **店舗検索**: 店舗名による簡易検索（リアルタイムフィルタリング）
- **店舗登録**: 新しい店舗の登録
- **店舗詳細**: 店舗情報とレビュー一覧の表示
- **レビュー投稿**: 店舗へのレビュー投稿（評価1〜5、コメント）
- **平均評価表示**: レビューの平均点を自動計算して表示

## ディレクトリ構造

```
app/
├── layout.tsx        # 全体レイアウト
├── page.tsx          # トップページ（店舗一覧）
├── loading.tsx       # ローディング表示
└── shops/
    ├── new/
    │   └── page.tsx  # 店舗登録フォーム
    └── [id]/
        └── page.tsx  # 店舗詳細 & レビュー

components/
├── ui/               # shadcn/ui コンポーネント
├── shops/            # 店舗関連コンポーネント
├── reviews/          # レビュー関連コンポーネント
└── shared/           # 共通コンポーネント

actions/              # Server Actions
├── shop.ts           # 店舗関連アクション
└── review.ts         # レビュー関連アクション

lib/
├── db.ts             # Prisma クライアント
└── utils.ts          # ユーティリティ関数

prisma/
├── schema.prisma     # データベーススキーマ
└── seed.ts           # シードデータ
```

## スクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintを実行
- `npm run db:push` - データベーススキーマを適用
- `npm run db:studio` - Prisma Studioを起動
- `npm run db:seed` - シードデータを投入
