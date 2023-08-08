/*
  Warnings:

  - You are about to alter the column `areaType` on the `ApiFilters` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `areaName` on the `ApiFilters` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `title` on the `Axis` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `url` on the `CardAvatar` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `altText` on the `CardAvatar` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `label` to the `PieChart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiFilters" ALTER COLUMN "areaType" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "areaName" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Axis" ALTER COLUMN "title" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "CardAvatar" ALTER COLUMN "url" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "altText" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "PieChart" ADD COLUMN     "label" "Structure" NOT NULL;
