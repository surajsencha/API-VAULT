/*
  Warnings:

  - A unique constraint covering the columns `[providedUrl]` on the table `Api` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providedUrl` to the `Api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Api" ADD COLUMN     "providedUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Api_providedUrl_key" ON "Api"("providedUrl");
