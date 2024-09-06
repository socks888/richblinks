/*
  Warnings:

  - Added the required column `label` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" ADD COLUMN     "label" TEXT NOT NULL;
