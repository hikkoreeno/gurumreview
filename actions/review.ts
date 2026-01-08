"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addReviewSchema = z.object({
  shopId: z.string(),
  authorName: z.string().optional(),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1, "コメントは必須です"),
});

export async function addReview(formData: FormData) {
  const validatedFields = addReviewSchema.safeParse({
    shopId: formData.get("shopId"),
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  await prisma.review.create({
    data: {
      shopId: validatedFields.data.shopId,
      authorName: validatedFields.data.authorName || "匿名",
      rating: validatedFields.data.rating,
      comment: validatedFields.data.comment,
    },
  });

  revalidatePath(`/shops/${validatedFields.data.shopId}`);
  return { success: true };
}
