/*
  Warnings:

  - You are about to drop the column `blink_url` on the `Blink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blink" DROP COLUMN "blink_url",
ALTER COLUMN "image_url" DROP NOT NULL;
