"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createShopSchema = z.object({
  name: z.string().min(1, "店舗名は必須です"),
  description: z.string().optional(),
  location: z.string().optional(),
});

export async function getShops(query?: string) {
  const shops = await prisma.shop.findMany({
    where: query
      ? {
          name: {
            contains: query,
          },
        }
      : undefined,
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return shops.map((shop) => ({
    ...shop,
    reviewCount: shop.reviews.length,
    averageRating:
      shop.reviews.length > 0
        ? shop.reviews.reduce((acc, r) => acc + r.rating, 0) / shop.reviews.length
        : null,
  }));
}

export async function getShopById(id: string) {
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!shop) return null;

  const averageRating =
    shop.reviews.length > 0
      ? shop.reviews.reduce((acc, r) => acc + r.rating, 0) / shop.reviews.length
      : null;

  return {
    ...shop,
    averageRating,
    reviewCount: shop.reviews.length,
  };
}

export async function createShop(formData: FormData) {
  const validatedFields = createShopSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const shop = await prisma.shop.create({
    data: {
      name: validatedFields.data.name,
      description: validatedFields.data.description || null,
      location: validatedFields.data.location || null,
    },
  });

  revalidatePath("/");
  return { success: true, shopId: shop.id };
}
