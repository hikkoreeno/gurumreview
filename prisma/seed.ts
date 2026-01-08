import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // サンプル店舗データ
  const shops = [
    {
      name: "麺屋 太郎",
      description:
        "創業30年の老舗ラーメン店。自家製麺と濃厚豚骨スープが自慢です。深夜まで営業しているので、仕事帰りにも立ち寄れます。",
      location: "東京都渋谷区道玄坂1-2-3",
    },
    {
      name: "イタリアン ベルデ",
      description:
        "本場イタリアで修行したシェフが腕を振るう本格イタリアン。手打ちパスタと薪窯で焼くピッツァが絶品です。",
      location: "東京都港区六本木4-5-6",
    },
    {
      name: "寿司処 海鮮",
      description:
        "毎朝築地から仕入れる新鮮なネタが自慢の寿司店。カウンター席では職人の技を間近で見ることができます。",
      location: "東京都中央区銀座7-8-9",
    },
    {
      name: "焼肉 炎",
      description:
        "A5ランクの黒毛和牛を使用した高級焼肉店。個室も完備しており、接待や特別な日のお食事にぴったりです。",
      location: "東京都新宿区歌舞伎町1-2-3",
    },
    {
      name: "カフェ モーニング",
      description:
        "自家焙煎のコーヒーとこだわりのモーニングセットが人気のカフェ。Wi-Fi完備でリモートワークにも最適です。",
      location: "東京都目黒区自由が丘2-3-4",
    },
  ];

  for (const shop of shops) {
    const createdShop = await prisma.shop.create({
      data: shop,
    });

    // 各店舗にサンプルレビューを追加
    const reviews = [
      {
        shopId: createdShop.id,
        authorName: "グルメ太郎",
        rating: 5,
        comment:
          "最高でした！また絶対来ます。スタッフの対応も素晴らしく、料理の味も文句なしです。",
      },
      {
        shopId: createdShop.id,
        authorName: "食べ歩きさん",
        rating: 4,
        comment:
          "とても美味しかったです。雰囲気も良く、デートにもおすすめ。次は違うメニューも試してみたい。",
      },
      {
        shopId: createdShop.id,
        authorName: "匿名",
        rating: 4,
        comment: "コスパが良いと思います。ランチタイムは特にお得感があります。",
      },
    ];

    for (const review of reviews) {
      await prisma.review.create({
        data: review,
      });
    }
  }

  console.log("シードデータの投入が完了しました！");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
