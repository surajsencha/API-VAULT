/*
  Warnings:

  - A unique constraint covering the columns `[baseUrl]` on the table `Api` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Api_baseUrl_key" ON "Api"("baseUrl");
